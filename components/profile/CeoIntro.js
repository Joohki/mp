import Image from "next/image";
import classes from "./CeoIntro.module.css";
const CeoIntro = () => {
  return (
    <div className={classes.ceo}>
      
      <h2>환경을 위해 나아가는 기업 <b>주식회사 엠피</b>입니다.</h2>
      <p>
        환경을 위해 나아가는 기업 주식회사 엠피입니다.
        <br />
        저희 엠피 그룹은 <br />
        <b>환경,에너지 컨설팅, 그리고 건강한 먹거리</b>를 소비자에게 제공함으로써{" "}
        <br />
        보다 깨끗한 지구를 다음 세대에게 물려주고자 하는 목적으로 출발한
        회사입니다.
        <br /> <br />
        <b>환경 부문 </b>에서는 <br /> 정부 정책을 기반으로 유기성 슬러지를 자원화하여{" "}
        <br /> 연료 및 수소생산 프로세스를 구축하고, <br /> 분해가 어려운 각종
        폐수를 모듈형 전기분해로 처리합니다.
        <br /> <br /> <b>에너지 컨설팅 부문 </b>에서는 <br /> 각종 정부 지원사업을
        대행하고 보일러의 에너지 절감을 돕습니다. <br /> <br /> <b>우리는 오랫동안
        꿈꾸었던 배출권 플랫폼을 만들어
        <br /> 보다 더 많은 고객에게 배출권리를 부여하고자 합니다.</b> <br /> <br />{" "}
        또한, 좋은 먹거리를 소비자에게 제공하여
        <br /> 판매보다는 건강을 우선으로 선물하고자 합니다. <br /> <br /> 모든
        임직원은 목표를 향하기 보다 선의의 목적을 가지고, <br /> 기업의 가치를
        높여 모두의 행복을 최우선으로 여길 것 입니다.  <br /> <br />{" "}
        감사합니다.
      </p>
      <footer>
        (주)엠피 대표이사 <b> &nbsp;이기원</b>{" "}
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
