import { Helmet } from "react-helmet"

const CommonHelmet = ({ title = "title" }: { title: string }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" content="Inova admin application" />
            <title>{title}</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    )
}

export default CommonHelmet