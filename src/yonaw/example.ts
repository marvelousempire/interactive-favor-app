/**
 * Example usage of the YONAW scoring logic
 * Run with: npx ts-node src/yonaw/example.ts  (after installing deps)
 */

import { scoreAndAggregate, YonawVote, VoterContext } from './index';

const exampleVote: YonawVote = {
  decision: 'Yes',
  tiers: {
    Light: { decision: 'Yes', why: 'Clean edges and consistent cut height' },
    Mixed: { decision: 'Yes', why: 'Slightly uneven near the fence but overall solid' },
    Dark: { decision: 'No', why: 'No major issues found' },
  },
  contextual: {
    ifCondition: 'the photo was taken before the job was finished',
    thenDecision: 'No',
  },
  intensity: 64, // slider or quadratic credits
  intensityIsQuadratic: false,
};

const highCredVoter: VoterContext = { credibility: 88 };
const midCredVoter: VoterContext = { credibility: 55 };
const lowCredVoter: VoterContext = { credibility: 22 };

const result = scoreAndAggregate([
  { vote: exampleVote, voter: highCredVoter },
  { vote: { ...exampleVote, decision: 'Yes', intensity: 40 }, voter: midCredVoter },
  { vote: { ...exampleVote, decision: 'No', intensity: 30 }, voter: lowCredVoter },
]);

console.log('YONAW Aggregation Result:');
console.log(JSON.stringify(result, null, 2));
