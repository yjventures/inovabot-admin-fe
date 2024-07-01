import { EllipsisHorizontalIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

interface RecentCompaniesInterface {
    name: string,
    logo: string,
    link: string,
    bots_number: number,
    recurring: 'Yearly' | 'Monthly' | 'Weekly' | 'Daily',
    payment_date: string,
    created: string,
}

const RecentCompanies = () => {
    const [menu, setMenu] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const recentCompanies: RecentCompaniesInterface[] = [
        {
            name: 'Google 1',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company1.com',
            bots_number: 3,
            recurring: 'Yearly',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 2',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company2.com',
            bots_number: 1,
            recurring: 'Monthly',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 2',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company2.com',
            bots_number: 1,
            recurring: 'Monthly',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 2',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company2.com',
            bots_number: 1,
            recurring: 'Monthly',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 3',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company3.com',
            bots_number: 5,
            recurring: 'Weekly',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 4',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company4.com',
            bots_number: 2,
            recurring: 'Daily',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 3',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company3.com',
            bots_number: 5,
            recurring: 'Weekly',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
        {
            name: 'Company 4',
            logo: 'https://via.placeholder.com/150',
            link: 'https://www.company4.com',
            bots_number: 2,
            recurring: 'Daily',
            payment_date: '2021-10-10',
            created: '2021-10-10',
        },
    ]

    // CompanyItems component
    const CompanyItems = ({ itemKey, value }: { itemKey: string, value: string | number }) => {
        return (
            <p className="text-light-headingText dark:text-dark-headingText text-sm flex justify-between items-center mb-2">
                <span>{itemKey}</span>
                <span>{value}</span>
            </p>
        )
    }

    // 

    return (
        <div className="w-full mt-4" onClick={() => {
            if (menu) setMenu(false)
        }}>
            <div className="flex justify-between items-center">
                <p className="text-light-headingText dark:text-dark-headingText text-2xl">Recent Companies </p>
                <div className="flex gap-2">
                    <button className="flex justify-center items-center gap-2 py-2 bg-white px-4 rounded-md border-[1px]">
                        View All
                    </button>
                    <button
                        className="flex justify-center items-center gap-2 py-2 text-white px-4 rounded-md transition duration-500 ease-in-out
                        bg-gradient-to-r from-blue-700 to-blue-500  hover:from-pink-500 hover:to-yellow-500"
                    >
                        <PlusIcon className="h-6 w-6" />
                        Add New
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-4">
                {recentCompanies.map((company, index) => (
                    <div key={index}
                        className="relative bg-white dark:bg-gray-800 p-4 rounded-md shadow-md flex flex-col gap-2 overflow-hidden">
                        <div className="flex justify-between items-start">
                            <input type="checkbox" name="common" id="common" />
                            <img src={company.logo} alt={company.name} className="h-[60px] w-[60px] object-cover rounded-md" />
                            <EllipsisHorizontalIcon
                                className="h-6 w-6 text-black dark:text-white cursor-pointer"
                                onClick={() => {
                                    setMenu(!menu)
                                    setSelectedIndex(index)
                                }}
                            />
                            {/* if menu is open show view edit and delete option */}
                            {menu && index === selectedIndex && (
                                <div className="absolute top-8 right-3 bg-white dark:bg-gray-800 rounded-md min-w-[120px] shadow-md">
                                    <div
                                        className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md"
                                        onClick={() => { console.log('test') }}
                                    >
                                        <p className="text-light-headingText dark:text-dark-headingText text-sm font-semibold">View</p>
                                        <EyeIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                    <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md">
                                        <p className="text-light-headingText dark:text-dark-headingText text-sm font-semibold">Edit</p>
                                        <PencilIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                    <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md">
                                        <p className="text-light-headingText dark:text-dark-headingText text-sm font-semibold">Delete</p>
                                        <TrashIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                </div>
                            )}
                            {/* <a href={company.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">View</a> */}
                        </div>
                        <p className="text-light-headingText dark:text-dark-headingText text-lg text-center mt-4">{company.name}</p>
                        <p className="text-center bg-purple-200 text-purple-800 text-sm rounded-md p-1 mx-auto">{company.link.slice(0, 20)}...</p>
                        <p className="border-b-[2px] border-dotted my-2"></p>

                        <CompanyItems itemKey="Bots" value={company.bots_number} />
                        <CompanyItems itemKey="Recurring" value={company.recurring} />
                        <CompanyItems itemKey="Payment Date" value={company.payment_date} />
                        <CompanyItems itemKey="Created" value={company.created} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentCompanies