
const Faq = () => {

    const faqItems = [
        'What is your name?',
        'What is your age?',
    ]


    const FaqItem = ({ item }: { item: string }) => {
        return (
            <div className="text-light-normalText dark:text-dark-normalText py-2 cursor-pointer hover:text-light-headingText dark:hover:text-dark-headingText">
                <h3>{item}</h3>
            </div>
        )
    }



    // main function
    return (
        <div className="pb-4">
            <h1 className=" font-semibold text-light-headingText dark:text-dark-headingText mb-2">FAQ</h1>
            {
                faqItems.map((item, index) => (
                    <FaqItem item={item} key={index} />
                ))
            }
        </div>
    )
}

export default Faq