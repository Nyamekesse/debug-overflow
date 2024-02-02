import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "Cascading Delete in SQL Alchemy",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: { _id: "authorId1", name: "John Doe", picture: "url-to-picture" },
    upvotes: 89,
    views: 952,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.00Z"),
  },
  {
    _id: "2",
    title: "How to center a div",
    tags: [
      { _id: "1", name: "css" },
      { _id: "2", name: "html" },
    ],
    author: {
      _id: "authorId2",
      name: "Michael Patrick",
      picture: "url-to-picture",
    },
    upvotes: 1000,
    views: 1250459,
    answers: [],
    createdAt: new Date("2022-09-01T12:00:00.00Z"),
  },
  {
    _id: "3",
    title: "Node models not updating.",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "node js" },
      { _id: "3", name: "web" },
    ],
    author: {
      _id: "authorId3",
      name: "Jones Aimee",
      picture: "url-to-picture",
    },
    upvotes: 100,
    views: 12514,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.00Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1 "
        />{" "}
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question.id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no questions to show"
            description="Be the first to break the silence! Ask a question and kickstart the
        discussion. Your query could be the next big thing others learn from.
        Get involved."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
