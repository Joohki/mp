import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 데이터 생성을 처리한다

  const { address } = req.body;

  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      address
    )}`,
    { headers }
  );
  const data = await response.json();
  
  res.status(200).json({
    message: "성공",
    data: { lat: data.documents[0].y, lng: data.documents[0].x },
  });
  // const result = await prisma.store.create({
  //   data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
  // });

  // return NextResponse.json(result, { status: 200 });
}
export default handler;
