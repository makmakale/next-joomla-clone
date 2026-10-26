export default function Home() {
    return (
        <div className="flex flex-col py-6 space-y-6">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/FghoeusbkUk?si=DLb_xQ4LlZPUM-Xf"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>

            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/3-CLwrav8ic?si=R665L6QG-FlqUqaV"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
}
