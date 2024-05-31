export const formatTimestamp = (timestamp) => { 

    const date = new Date(timestamp.toMillis());
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
// Function to generate a unique key for messages or other items

export const generatekey = () => {
    return Math.random().toString(36).substr(2, 10);
};

// Function to sort messages based on their timestamp

export const sortMessagesByTimestamp =(messages)=>{
     return messages.sort( 
         (a, b) => a.timestamp.toMillis() - b.timestamp.toMillis() 
        );
    };
    