import { ReactNode, useEffect, useState } from 'react';
import EnvCard from '../components/evironmentCard';
import useSocket from '../customizes/useSocket';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import LineChart from '../components/LineChart';

const data1 = [ 0 ];

const humidUrl = "http://localhost:3001/api/v1/devices/660ebbdbb55dfa6d3aa6ab9d"
const lightUrl = "http://localhost:3001/api/v1/devices/660ebc78b55dfa6d3aa6ab9f"

const fetchThreshold = async (url : string) => {
    try {
        const res = await axios.get(url);
        return Number(res.data.threshold);
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

const curHumidLim = await fetchThreshold(humidUrl);
const curLightLim = await fetchThreshold(lightUrl);

const Environment = (props: any): ReactNode => {
    const [light, setLight] = useState(0);
    const [humid, setHumid] = useState(0);
    const socket = useSocket;
    const [graphData, setGraphData] = useState(data1);
    const [humidLimit, setHumidLimit] = useState(curHumidLim);
    const [lightLimit, setLightLimit] = useState(curLightLim);
    const handleSetTitle = useOutletContext<(title: string) => void>();

    let temperature = 0;
    useEffect(() => {
        socket.on("light", (data: string) => {
            setLight(Number(data));
        });

        socket.on("humidity", (data: string) => {
            setHumid(Number(data));
        });

        socket.on("temperature", (data: string) => {
            temperature = Number(data);
            console.log(temperature);
        });

        const intervalId = setInterval(() => {
            setGraphData(prevData => {
                let tempData = [...prevData];
                if (tempData.length <= 7) {
                    tempData.push(temperature);
                }
                else {
                    tempData.shift();
                    tempData.push(temperature);
                }
                return tempData;
            });
        }, 5000);
    }, [socket]);
      
    useEffect(() => {
        handleSetTitle("Environment")
    },[]);

    return (
        <div className=" h-full w-full p-8" >
            <span className='text-2xl font-bold'>Live tempurature chart</span>
            <div className="w-900 h-80 mt-4">
                <LineChart data={graphData} />
            </div>
            <span className='text-2xl font-bold'>Current environment information</span>
            <div className="mt-4 flex justify-around flex-wrap">
                <EnvCard curVal={light} limit={lightLimit} setLimit={setLightLimit} name="Light" color="#00b3a7" className="w-14" icon="light"/>
                <EnvCard curVal={humid} limit={humidLimit} setLimit={setHumidLimit} name="Humidity" color="#00b3a7" className="w-14" icon="humid"/>
            </div>
        </div>
    )
}

export default Environment;