import type { GameReview } from "../types/review";

export const gameReviews: GameReview[] = [
  {
    id: 1,
    title: "Elden Ring",
    genre: "RPG",
    rating: 9.5,
    summary: "높은 자유도와 도전적인 전투가 인상적인 오픈월드 RPG입니다.",
    detail:
      "방대한 오픈월드, 다양한 빌드 구성, 보스전의 긴장감이 뛰어난 게임입니다. 난이도는 높은 편이지만 탐험과 성장의 재미가 확실합니다.",
    recommended: true,
  },
  {
    id: 2,
    title: "Valorant",
    genre: "FPS",
    rating: 8.6,
    summary: "전술적인 팀플레이와 정밀한 사격이 중요한 FPS 게임입니다.",
    detail:
      "캐릭터별 스킬과 총기 숙련도가 결합된 게임으로, 팀원 간 소통과 전략이 매우 중요합니다.",
    recommended: true,
  },
  {
    id: 3,
    title: "League of Legends",
    genre: "MOBA",
    rating: 8.8,
    summary: "전략, 피지컬, 팀 운영이 복합적으로 요구되는 대표적인 MOBA 게임입니다.",
    detail:
      "챔피언 조합, 라인전, 오브젝트 운영, 한타 판단 등 다양한 요소가 승패에 영향을 주는 게임입니다.",
    recommended: true,
  },
  {
    id: 4,
    title: "Stardew Valley",
    genre: "Simulation",
    rating: 9.0,
    summary: "농장 경영과 마을 생활을 편안하게 즐길 수 있는 시뮬레이션 게임입니다.",
    detail:
      "농사, 낚시, 채집, 인간관계 등 다양한 활동을 자유롭게 즐길 수 있으며, 부담 없이 오래 플레이하기 좋습니다.",
    recommended: true,
  },
  {
    id: 5,
    title: "Tomb Raider",
    genre: "Adventure",
    rating: 8.2,
    summary: "탐험과 액션, 퍼즐 요소가 결합된 어드벤처 게임입니다.",
    detail:
      "스토리 진행과 탐험 요소가 적절히 섞여 있으며, 액션 게임을 가볍게 즐기고 싶은 사용자에게 적합합니다.",
    recommended: true,
  },
  {
    id: 6,
    title: "Overwatch 2",
    genre: "FPS",
    rating: 7.4,
    summary: "영웅별 역할과 팀 조합이 중요한 하이퍼 FPS 게임입니다.",
    detail:
      "캐릭터마다 역할과 플레이 방식이 뚜렷하지만, 팀 조합과 밸런스에 따라 재미가 크게 달라질 수 있습니다.",
    recommended: false,
  },
];