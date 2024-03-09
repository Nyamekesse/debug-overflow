import { UserId, Voting } from '@/lib/actions/shared.types';

interface Props extends UserId, Voting {
  type: string;
  itemId: string;
  upvotes: number;
  downvotes: number;
  hasSaved?: boolean;
}

const Votes = ({ type, itemId, userId, upvotes, hasupVoted, downvotes, hasdownVoted, hasSaved }: Props) => {
  return <div>Votes</div>;
};

export default Votes;
