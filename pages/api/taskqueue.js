import { PrismaClient } from "@prisma/client";
import { getChunks, getContent, generateEmbeddings } from "../../utils";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const urlLimit = 100;
const handler = async (req, res) => {
  const params = req.params;
  const queryParams = req.query;
  const bodyParams = req.body;
  const request = { ...params, ...queryParams, ...bodyParams };
  let project_id = request?.project_id;

  const projects = await prisma.projects.findMany({
    where: {
      project_id: project_id ? project_id : undefined,
      OR: [
        {
          status: "processing",
        },
        {
          status: "reprocessing",
        },
      ],
    },
    take: 5,
  });
  const data = [];
  const chunkedData = [];
  if (projects?.length) {
    const random = Math.floor(Math.random() * projects?.length);
    project_id = project_id ? project_id : projects[random]?.project_id;
    if (!project_id) return res.status(400).json({ success: false, data: [] });
    const urls = await prisma.taskqueue.findMany({
      where: {
        project_id: project_id,
      },
      take: urlLimit,
      select: {
        url: true,
      },
    });
    if (urls.length === 0) {
      await prisma.projects.update({
        where: {
          project_id: project_id,
        },
        data: {
          status: "completed",
        },
      });
    } else {
      const toFetch = urls?.length > urlLimit ? urlLimit : urls?.length;
      for (let i = 0; i < toFetch; i++) {
        const content = await getContent(urls?.[i]?.url);
        const chunkedContentData = await getChunks(content);
        chunkedData.push(chunkedContentData);
        data.push({
          id: project_id,
          ...chunkedContentData,
        });
      }
      await generateEmbeddings(prisma, data);
    }
  } else {
    // await fs.writeFileSync(
    //   path.join(__dirname, "../../../../prisma/queuestatus"),
    //   "false"
    // );
    res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json({ success: true, data: [] });
};

export default handler;
