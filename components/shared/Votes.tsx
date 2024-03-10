'use client';

import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { UserId, Voting } from '@/lib/actions/shared.types';
import { getFormattedNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface Props extends UserId, Voting {
  type: string;
  itemId: string;
  upvotes: number;
  downvotes: number;
  hasSaved?: boolean;
}

const Votes = ({ type, itemId, userId, upvotes, hasupVoted, downvotes, hasdownVoted, hasSaved }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const handleVote = async (action: string) => {
    if (!userId) return;

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({ questionId: JSON.parse(itemId), userId: JSON.parse(userId), hasupVoted, hasdownVoted, path: pathName });
      } else if (type === 'Answer') {
        // await upvoteAnswer({ questionId: JSON.parse(itemId), userId: JSON.parse(userId), hasupVoted, hasdownVoted, path: pathName });
      }

      return;
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({ questionId: JSON.parse(itemId), userId: JSON.parse(userId), hasupVoted, hasdownVoted, path: pathName });
      } else if (type === 'Answer') {
        // await downvoteAnswer({ questionId: JSON.parse(itemId), userId: JSON.parse(userId), hasupVoted, hasdownVoted, path: pathName });
      }

      return;
    }
  };
  const handleSave = () => {};
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            className="cursor-pointer"
            src={hasupVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
            width={18}
            height={18}
            alt="vote icon"
            onClick={() => handleVote('upvote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] p-1 rounded-sm ">
            <p className="subtle-medium text-dark400_light900">{getFormattedNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            className="cursor-pointer"
            src={hasdownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}
            width={18}
            height={18}
            alt="vote icon"
            onClick={() => handleVote('downvote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] p-1 rounded-sm ">
            <p className="subtle-medium text-dark400_light900">{getFormattedNumber(downvotes)}</p>
          </div>
        </div>
      </div>
      <Image
        className="cursor-pointer"
        src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
        width={18}
        height={18}
        alt="save icon"
        onClick={handleSave}
      />
    </div>
  );
};

export default Votes;
