/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length == 0) return [];
  let result = {};

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    let team1 = match.team1;
    let team2 = match.team2;
    if (!result[team1]) {
      result[team1] = {
        team: team1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (!result[team2]) {
      result[team2] = {
        team: team2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    switch (match.result) {
      case "win":
        if (match.winner === team1) {
          result[team1].won += 1;
          result[team1].points += 2;
          result[team2].lost += 1;
        } else {
          result[team2].won += 1;
          result[team2].points += 2;
          result[team1].lost += 1;
        }
        result[team1].played += 1;
        result[team2].played += 1;
        break;
      case "tie":
        result[team2].played += 1;
        result[team1].played += 1;
        result[team1].points += 1;
        result[team2].points += 1;
        result[team1].tied += 1;
        result[team2].tied += 1;
        break;
      case "no_result":
        result[team1].played += 1;
        result[team1].noResult += 1;
        result[team1].points += 1;

        result[team2].played += 1;
        result[team2].noResult += 1;
        result[team2].points += 1;
        break;
    }
  }

  let resultArray = Object.values(result).sort((a, b) => {
    if (a.points !== b.points) {
      console.log("Points are not equal")
      return b.points - a.points;
    } else {
      console.log("points are equal")
      return a.team.localeCompare(b.team);
    }
  });
  console.log("Resulted Array", resultArray);
  return resultArray;
}

iplPointsTable([
  { team1: "KKR", team2: "SRH", result: "no_result" },
  // { team1: "RCB", team2: "CSK", result: "tie" },
]);
