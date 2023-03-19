
const OPEN_AI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;
const AI_ENDPOINT = `https://api.openai.com/v1/chat/completions`;
export const suggestToSong = async (mood, isTurkish) => {
    const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Şu an ruh halim '${mood}'. Bana bir tane ${isTurkish ? "türkçe" : "yabancı"} şarkı önerir misin? Lütfen ilk satıra şarkı adını yaz. Sonra açıklama yap`
                },
            ],
            max_tokens: 200,
        }),
    }); 
    return response.json();
};