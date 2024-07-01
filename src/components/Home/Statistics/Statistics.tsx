import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import incomeImg from '@/assets/images/home/income.png'
import expenseImg from '@/assets/images/home/expense.png'
import { ArrowDownLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Statistics = () => {
    const data = [
        { name: 'Jan', income: 400, expense: 240 },
        { name: 'Feb', income: 500, expense: 300 },
        { name: 'Mar', income: 450, expense: 500 },
        { name: 'Apr', income: 700, expense: 400 },
        { name: 'May', income: 800, expense: 700 },
        { name: 'Jun', income: 700, expense: 600 },
        { name: 'Jul', income: 1000, expense: 800 },
        { name: 'Aug', income: 1100, expense: 900 },
        { name: 'Sep', income: 1200, expense: 1000 },
        { name: 'Oct', income: 1400, expense: 700 },
        { name: 'Nov', income: 1330, expense: 600 },
        { name: 'Dec', income: 1500, expense: 500 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 w-full mt-4 rounded-md border-[1px]">
            <p className="text-2xl text-dark-panel dark:text-light-panel">Statistics</p>
            <p className="text-gray-500 text-md mt-2">Income and Expenses</p>

            {/* net income and expense */}
            <div className='flex justify-start items-center gap-4 mt-4'>
                {/* income */}
                <div className='flex items-start'>
                    <img src={incomeImg} alt="icon" />
                    <div className='flex flex-col ml-2'>
                        <p className='text-lg text-gray-500'>Income</p>
                        <div className='flex gap-2'>
                            <p className=' text-light-headingText dark:text-dark-headingText text-lg font-semibold'>$12,000</p>
                            <p className='text-sm text-green-500 mt-1'>15%</p>
                            <ChevronUpIcon className='h-5 w-5 text-green-500 mt-1' />
                        </div>
                    </div>
                </div>
                {/* expense */}
                <div className='flex items-start'>
                    <img src={expenseImg} alt="icon" />
                    <div className='flex flex-col ml-2'>
                        <p className='text-lg text-gray-500'>Expense</p>
                        <div className='flex gap-2'>
                            <p className=' text-light-headingText dark:text-dark-headingText text-lg font-semibold'>$12,000</p>
                            <p className='text-sm text-red-500 mt-1'>15% </p>
                            <ChevronDownIcon className='h-5 w-5 text-red-500 mt-1' />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: 400 }} className='mt-6 overflow-hidden'>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 1200]} tickCount={7} />
                        <Tooltip 
                            cursor={{ stroke: 'green', strokeWidth: 2 }}
                            contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '10px' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            wrapperStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
