import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { ProjectInterface } from "@/common.types";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = result?.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {projectDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()} className="hovernew-text">
                {projectDetails?.createdBy?.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="text-gray-100 font-semibold hovernew-text"
              >
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${projectDetails?.image}`}
          className="object-cover rounded-2xl shadow-2xl"
          width={764}
          height={498}
          alt="poster"
        />
      </section>

      <section className="flex w-full flex-col gap mt-20">
        <div className="my-3">
          <p className="font-poppins font-semibold text-lg text-left">
            Description
          </p>
          <div className="bg-stone-300 lg:rounded-full rounded-xl p-3 my-1">
            <p className="max-w-5xl text-left text-sm font-inter">
              {projectDetails?.description}
            </p>
          </div>
        </div>
        <div className="my-3">
          <p className="font-poppins font-semibold text-lg text-left">
            Components/APIs
          </p>
          <div className="bg-stone-300 lg:rounded-full rounded-xl p-3 my-1">
            <p className="max-w-5xl text-left text-sm font-inter">
              {projectDetails?.components}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-5 gap-5">
          <div className="bg-black-100 p-2 rounded-full">
            <Link
              href={projectDetails?.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flexCenter gap-2 tex-sm font-medium text-gray-100"
            >
              <span className="font-montserrat hovernewtwo-text text-sm text-white">
                Github
              </span>
            </Link>
          </div>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <div className="bg-black-100 p-2 rounded-full">
            <Link
              href={projectDetails?.liveSiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flexCenter gap-2 text-sm font-medium text-gray-100"
            >
              <span className="font-montserrat hovernewtwo-text text-sm text-white">
                Live Site URL
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <Link href={renderLink()} className="min-w-[82px]  h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-xl  shadow-2xl"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-1 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </Modal>
  );
};

export default Project;
