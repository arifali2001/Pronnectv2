import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
import Image from "next/image";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  // @ts-ignore
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col text-sm font-poppins paddings bg-gray-50">
        <Categories />

        <p className="no-result-text text-center">p-Testing [0] Projects</p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col paddings mb-16 bg-gray-50">
      <div className="flex flex-row px-3 mt-20 py-2 rounded-full border  bg-gray-50 ">
        <h2 className=" text-sm pr-2   font-montserrat font-semibold text-black-100">
          Specially For India{" "}
        </h2>
        <Image
          src="/india-flag-icon.svg"
          width={20}
          height={20}
          alt="Indian Flag"
          className="object-contain"
        />
      </div>

      <div className="text-center my-10">
        <div className="my-5">
          <h1 className="lg:text-6xl text-4xl my-4 font-fanwood">
            Find Original Projects By University's Best Students{" "}
          </h1>
        </div>
        <h1 className="lg:text-lg text-sm font-montserrat text-black-100">
          Looking for good Project Platform? Don't worry, you are at the right
          place!
        </h1>
      </div>
      <div className="mb-10">
        <h2 className="px-3 py-2 text-sm rounded-full font-montserrat font-semibold bg-orange-300 text-black-100">
          Sign Up & Start Showing Off
        </h2>
      </div>

      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={data?.projectSearch?.pageInfo?.startCursor}
        endCursor={data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
  );
};

export default Home;
