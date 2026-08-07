/**
 * YONAW Scoring Module
 * Public exports for the Yes-or-No-and-Why valuation engine.
 */

export * from './types';
export {
  scoreSingleVote,
  applyCredibilityWeight,
  scoreVote,
  aggregateVotes,
  scoreAndAggregate,
} from './scoring';
