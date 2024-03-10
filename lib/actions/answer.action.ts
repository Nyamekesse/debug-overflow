'use server';

import Answer from '@/database/answer.model';
import Question from '@/database/question.model';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../db.connection';
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from './shared.types';

export async function createAnswer(params: CreateAnswerParams) {
  connectToDatabase();
  try {
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({
      content,
      author,
      question,
      path,
    });
    const questionObj = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    //  await Interaction.create({
    //    user: author,
    //    action: 'answer',
    //    question,
    //    answer: newAnswer._id,
    //    tags: questionObj.tag,
    //  });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId }).populate('author', '_id clerkId name picture').sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();
    const { hasdownVoted, answerId, path, userId, hasupVoted } = params;
    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error('Answer not found!');
    }

    revalidatePath(path);
  } catch (error) {
    console.log('an error occurred', error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();
    const { hasdownVoted, answerId, path, userId, hasupVoted } = params;
    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error('Answer not found!');
    }

    revalidatePath(path);
  } catch (error) {
    console.log('an error occurred', error);
    throw error;
  }
}
