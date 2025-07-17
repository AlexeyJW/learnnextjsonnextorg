interface WorkerPageProps {
    params: {
        slug: string;
    };
}
export default function Page({ params }: WorkerPageProps) {
   const slug = typeof params.slug === "string" ? params.slug : JSON.stringify(params.slug);
    return(
        <div>
            Worker: {slug}
        </div>
    )
}