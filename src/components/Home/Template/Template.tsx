import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"


interface TemplateInterface {
    platform: string,
    title: string,
    tag: string,
    subtitle: string,
    color: string
}

const Template = () => {

    const templates: TemplateInterface[] = [
        {
            platform: 'FB',
            title: 'WhatsApp Bot',
            tag: 'Popular',
            subtitle: 'Assists customers with common queries, troubleshooting, and ticketing.',
            color: '#D594C6'
        },
        {
            platform: 'FB',
            title: 'Facebook Bot',
            tag: 'New',
            subtitle: 'This is a new template for Facebook Bot',
            color: '#9594D5'
        },
        {
            platform: 'TW',
            title: 'Instagram Bot',
            tag: 'Trending',
            subtitle: 'Assists customers with common queries, troubleshooting, and ticketing.',
            color: '#9594D5'
        },
        {
            platform: 'TW',
            title: 'Twitter Bot',
            tag: 'Popular',
            subtitle: 'This is a popular template for Twitter Bot',
            color: '#9594D5'
        },
        {
            platform: 'FB',
            title: 'WhatsApp Bot',
            tag: 'Popular',
            subtitle: 'Assists customers with common queries, troubleshooting, and ticketing.',
            color: '#D594C6'
        },
        {
            platform: 'FB',
            title: 'Facebook Bot',
            tag: 'New',
            subtitle: 'This is a new template for Facebook Bot',
            color: '#9594D5'
        },
        {
            platform: 'TW',
            title: 'Instagram Bot',
            tag: 'Trending',
            subtitle: 'Assists customers with common queries, troubleshooting, and ticketing.',
            color: '#9594D5'
        },
        {
            platform: 'TW',
            title: 'Twitter Bot',
            tag: 'Popular',
            subtitle: 'This is a popular template for Twitter Bot',
            color: '#9594D5'
        }
    ]
    return (
        <div className="w-full mt-4">
            <div className="flex justify-between items-center">
                <p className="text-light-headingText dark:text-dark-headingText text-2xl">Quick Start Template</p>
                <div className="flex gap-2">
                    <button className="flex justify-center items-center gap-2 py-2 bg-white px-4 rounded-md">
                        <AdjustmentsHorizontalIcon className="h-6 w-6" />
                        Filters
                    </button>
                    <button className="flex justify-center items-center gap-2 py-2 bg-white px-4 rounded-md">
                        View All
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {
                    templates.map((template, index) => (
                        <div key={index} className="border-2 border-[#eeeff2] rounded-md p-4 ">
                            <div className="flex justify-start items-start gap-2">
                                <p className="bg-[#EBEEFF] text-[#3250FF] p-4 rounded-full">{template.platform}</p>
                                <div className=" flex flex-col gap-2">
                                    <p className="text-md text-dark dark:text-white font-semibold ">{template.title}</p>
                                    <p
                                        className="text-[12px] rounded-full text-start px-4 py-[2px] w-[fit-content]"
                                        style={{
                                            backgroundColor: template.color,
                                            color: 'white'
                                        }}
                                    >
                                        #{template.tag}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-500 mt-2">{template.subtitle}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Template