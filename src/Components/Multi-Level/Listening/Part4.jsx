export default function Part4() {
    const animals = ["A", "B", "C", "D", "E", "F"];

    return (
        <div className="p-4  space-y-8 pb-[100px]">
            {/* Инструкция */}
            <div>
                <p className="text-lg font-semibold">
                    You will hear someone giving a talk. Label the places (19-23) on the map (A-H). There are THREE extra options which you do not need to use.
                    Mark your answers on the answer sheet.                </p>
            </div>


            <div className="block">
                <img className="w-[400px] h-[400px]" src="https://www.mytests.uz/public/static/ml-test-1/l_1.jpg" alt="foto" />
            </div>

            {/* Выпадающие списки для спикеров */}
            <div className="space-y-4 max-w-[700px]">
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <span className="bg-MainColor text-[white] p-[5px] rounded-[5px]">
                            {18 + i}
                        </span>
                        <span className="text-md font-medium">Center...  {i + 1}</span>
                        <select className="border w-[200px] border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled selected>
                                Select
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
