import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";


const Wrapper = ({
    onVote,
    optionId,
}: {
    onVote: (nominationId: number) => void;
    optionId: number;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [captcha, setCaptcha] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (captcha) {
            console.log("ReCaptcha Verified");
            onVote(optionId);
            setIsModalOpen(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        // Сбросить значение капчи при открытии модального окна
        setCaptcha(null);
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-[#336AEA] text-white rounded-lg sm:m-0 mt-4"
                onClick={handleOpenModal}
            >
                Голосовать
            </button>
            {isModalOpen && (
                <form
                    className="flex flex-col gap-4 justify-center items-center fixed top-0 left-0 w-full h-full bg-black/80"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-white text-2xl font-semibold">Вы уверены в выборе?</h1>
                    <div className="space-x-4">
                        <button
                            className="px-4 py-2 bg-[#ea3333] text-white rounded-lg sm:m-0 mt-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Закрыть
                        </button>
                        <button
                            className="px-4 py-2 bg-[#336AEA] text-white rounded-lg sm:m-0 mt-4"
                            disabled={!captcha}
                            type="submit"
                        >
                            Проголосовать
                        </button>
                    </div>
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={setCaptcha}
                    />
                </form>
            )}
        </div>
    );
};

export default Wrapper;
