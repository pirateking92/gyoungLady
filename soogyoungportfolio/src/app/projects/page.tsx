import Image from "next/image";
import Link from "next/link";
import { client, getAllProjectsQuery, urlFor } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(getAllProjectsQuery);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-gray-600 mb-12">
            A collection of conservation and restoration work
          </p>

          {projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                    {project.mainImage && (
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={urlFor(project.mainImage.asset).width(600).height(450).url()}
                          alt={project.mainImage.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                        {project.title}
                      </h2>
                      {project.projectDate && (
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(project.projectDate).getFullYear()}
                        </p>
                      )}
                      {project.client && (
                        <p className="text-sm text-gray-600 mb-3">
                          Client: {project.client}
                        </p>
                      )}
                      {project.excerpt && (
                        <p className="text-gray-600 line-clamp-3">
                          {project.excerpt}
                        </p>
                      )}
                      {project.featured && (
                        <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No projects yet. Add some projects in Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
