interface Winner {
    name: string;
    wins: number;
  }
  
  export let winners: Winner[] = [];
  
  export function updateWinners(): string {
    const response = JSON.stringify({
      type: "update_winners",
      data: JSON.stringify(winners),
      id: 0,
    });
    return response;
  }
