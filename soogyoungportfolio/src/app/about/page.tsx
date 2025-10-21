import Image from "next/image";
import { PortableText } from "next-sanity";
import { client, getAboutPageQuery, getCVFileQuery, urlFor } from "@/lib/sanity";
import type { About, CV } from "@/types/sanity";

export default async function AboutPage() {
  const [aboutData, cvData] = await Promise.all([
    client.fetch<About>(getAboutPageQuery),
    client.fetch<CV>(getCVFileQuery),
  ]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Profile Section */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 mb-16">
          <div>
            {aboutData?.profilePhoto && (
              <Image
                src={urlFor(aboutData.profilePhoto.asset).width(300).height(300).url()}
                alt={aboutData.profilePhoto.alt || aboutData.name}
                width={300}
                height={300}
                className="rounded-lg shadow-lg"
                priority
              />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{aboutData?.name}</h1>
            {aboutData?.specializations && aboutData.specializations.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {aboutData.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <a
                  href={`mailto:${aboutData?.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {aboutData?.email}
                </a>
              </div>
              {aboutData?.phone && (
                <div>
                  <h3 className="font-semibold text-gray-700">Phone</h3>
                  <a
                    href={`tel:${aboutData.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {aboutData.phone}
                  </a>
                </div>
              )}
              {cvData && (
                <div>
                  <a
                    href={cvData.cvFile.asset.url}
                    download
                    className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Download CV
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Biography */}
        {aboutData?.bio && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Biography</h2>
            <div className="prose prose-lg max-w-none">
              <PortableText value={aboutData.bio} />
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {aboutData?.credentials && aboutData.credentials.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Education & Credentials</h2>
            <div className="space-y-6">
              {aboutData.credentials.map((credential, index) => (
                <div
                  key={index}
                  className="border-l-4 border-gray-300 pl-6 py-2"
                >
                  <h3 className="text-xl font-semibold">{credential.title}</h3>
                  <p className="text-gray-600">
                    {credential.institution} • {credential.year}
                  </p>
                  {credential.description && (
                    <p className="mt-2 text-gray-700">{credential.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Links */}
        {aboutData?.socialLinks && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Connect</h2>
            <div className="flex gap-4">
              {aboutData.socialLinks.linkedin && (
                <a
                  href={aboutData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  LinkedIn
                </a>
              )}
              {aboutData.socialLinks.instagram && (
                <a
                  href={aboutData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Instagram
                </a>
              )}
              {aboutData.socialLinks.twitter && (
                <a
                  href={aboutData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Twitter
                </a>
              )}
              {aboutData.socialLinks.website && (
                <a
                  href={aboutData.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Website
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
