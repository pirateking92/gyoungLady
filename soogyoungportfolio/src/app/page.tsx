import Image from "next/image";
import Link from "next/link";
import { client, getHomepageDataQuery, getFeaturedProjectsQuery, urlFor } from "@/lib/sanity";
import type { HomepageData, Project } from "@/types/sanity";

export default async function Home() {
  // Fetch homepage data and featured projects
  const [homepageData, featuredProjects] = await Promise.all([
    client.fetch<HomepageData>(getHomepageDataQuery),
    client.fetch<Project[]>(getFeaturedProjectsQuery),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {homepageData?.profilePhoto && (
            <div className="mb-8">
              <Image
                src={urlFor(homepageData.profilePhoto.asset).width(200).height(200).url()}
                alt={homepageData.profilePhoto.alt || homepageData.name}
                width={200}
                height={200}
                className="rounded-full mx-auto"
                priority
              />
            </div>
          )}
          <h1 className="text-5xl font-bold mb-4">
            {homepageData?.name || "Art Conservator"}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {homepageData?.tagline || "Preserving art for future generations"}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/projects"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-black rounded-lg hover:bg-gray-50 transition"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
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
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                        {project.title}
                      </h3>
                      {project.client && (
                        <p className="text-sm text-gray-500 mb-2">
                          {project.client}
                        </p>
                      )}
                      {project.excerpt && (
                        <p className="text-gray-600 line-clamp-3">
                          {project.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} {homepageData?.name || "Art Conservator Portfolio"}
          </p>
          {homepageData?.socialLinks && (
            <div className="flex gap-6 justify-center mt-4">
              {homepageData.socialLinks.linkedin && (
                <a
                  href={homepageData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition"
                >
                  LinkedIn
                </a>
              )}
              {homepageData.socialLinks.instagram && (
                <a
                  href={homepageData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition"
                >
                  Instagram
                </a>
              )}
              {homepageData.email && (
                <a
                  href={`mailto:${homepageData.email}`}
                  className="text-gray-600 hover:text-black transition"
                >
                  Contact
                </a>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
