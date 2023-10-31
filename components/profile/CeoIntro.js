import Image from "next/image";
import classes from "./CeoIntro.module.css";
const CeoIntro = () => {
  return (
    <div className={classes.ceo}>
      <h1>인사말</h1>
      <h2>환경을 위해 나아가는 기업 주식회사 엠피입니다.</h2>
      <p>
        저희 엠피 그룹은 환경,에너지 컨설팅, 그리고 건강한 먹거리를 소비자에게
        제공함으로써 보다 깨끗한 지구를 다음 세대에게 물려주고자 하는 목적으로
        출발한 회사입니다.
        <br />
        <br />
        환경 부문에서는 정부 정책에 부응하여 유기성 슬러지를 자원화하여 연료 및
        수소를 생산하는 프로세스를 구축하고, 각종 난분해성 폐수를 모듈형
        전기분해로 처리합니다. <br /> <br />
        에너지 컨설팅 부문에서는 각종 정부 지원사업을 대행하고 보일러의 에너지
        절감을 돕습니다.
        <br /> <br />
        뿐만 아니라, 우리는 오랫동안 꿈꾸었던 배출권 플랫폼을 만들어, 배출권
        대상이 아닌 모든 고객에게 배출권 권리를 부여하고자 합니다.
        <br /> <br />
        또한, 좋은 먹거리를 소비자에게 제공하여 판매가 아닌 건강을 선물하고자
        하는 회사입니다. <br /> <br />
        내부적으로는 모든 임직원이 목표보다는 목적을 가지고 열심히 일하며,
        기업의 가치를 높여 임직원과 그 가족들의 행복을 최우선으로 여깁니다.{" "}
        <br /> <br />
        감사합니다.
        <br /> <br />
        
      </p>
      <footer>
        (주)엠피 대표이사 이기원{" "}
        <Image
          src="/images/mpimage/ceosignature.png"
          alt="ceosignature"
          width={300}
          height={200}
        />
      </footer>
    </div>
  );
};

export default CeoIntro;
