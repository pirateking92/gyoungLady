import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client, getProjectBySlugQuery, getAllProjectsQuery, urlFor } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await client.fetch<Project[]>(getAllProjectsQuery);
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<Project>(getProjectBySlugQuery, { slug });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Soogyoung Park - Conservator`,
    description: project.excerpt || `Conservation project: ${project.title}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<Project>(getProjectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition"
        >
          ← Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            {project.projectDate && (
              <span>{new Date(project.projectDate).toLocaleDateString()}</span>
            )}
            {project.client && <span>• Client: {project.client}</span>}
          </div>
        </header>

        {/* Main Image */}
        {project.mainImage && (
          <div className="mb-12">
            <div className="aspect-[16/10] relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={urlFor(project.mainImage.asset).width(1200).height(750).url()}
                alt={project.mainImage.alt || project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {project.mainImage.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                {project.mainImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Before & After Images */}
        {project.beforeAfter?.before && project.beforeAfter?.after && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Before & After</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={urlFor(project.beforeAfter.before.asset).width(600).height(600).url()}
                    alt={project.beforeAfter.before.alt || "Before restoration"}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center font-semibold">Before</p>
              </div>
              <div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={urlFor(project.beforeAfter.after.asset).width(600).height(600).url()}
                    alt={project.beforeAfter.after.alt || "After restoration"}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center font-semibold">After</p>
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Project Description</h2>
          <div className="prose prose-lg max-w-none">
            <PortableText value={project.description} />
          </div>
        </section>

        {/* Materials & Techniques */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {project.materials && project.materials.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Materials Used</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {project.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </section>
          )}

          {project.techniques && project.techniques.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Techniques</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {project.techniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index}>
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={urlFor(image.asset).width(600).height(600).url()}
                      alt={image.alt || `${project.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  {image.caption && (
                    <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="pt-8 border-t">
          <Link
            href="/projects"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
