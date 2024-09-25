

const DataINMETAPI = async () => {
        const response = await fetch(`http://localhost:3000/get-data-inmet-free`)
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('dataStation', JSON.stringify(data.data))
            console.log(data.data)
    
        } else {
            console.error("Erro na requisição:", response.status);
        }      
};

setInterval(DataINMETAPI, 60000);