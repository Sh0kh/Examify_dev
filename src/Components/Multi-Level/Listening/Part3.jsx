export default function Part3() {
    const animals = ["A) Leopard", "B) Gorilla", "C) Elephant", "D) Tiger", "E) Lion", "F) Bear"];

    return (
        <div className="p-4  space-y-8 pb-[100px]">
            {/* Инструкция */}
            <div>
                <p className="text-lg font-semibold">
                    You will hear people speaking about different wild animals. Match each speaker (15-18) to the animals (A-F). There are TWO EXTRA animals which you do not need to use.
                </p>
            </div>

            {/* Выпадающие списки для спикеров */}
            <div className="space-y-4 max-w-[700px]">
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <span className="bg-MainColor text-[white] p-[5px] rounded-[5px]">
                            {15 + i}
                        </span>
                        <span className="text-md font-medium">Speaker {i + 1}</span>
                        <select className="border w-[200px] border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled selected>
                                Select an animal
                            </option>
                            {animals.map((animal, index) => (
                                <option key={index} value={animal}>
                                    {animal}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}
