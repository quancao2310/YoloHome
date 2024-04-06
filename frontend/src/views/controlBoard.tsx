import { ReactNode, useState } from "react";
import ControlBoardChart from "../components/controlBoard/controlBoardChart";
import LedButton from "../components/controlBoard/ledButton";
import FanButton from "../components/controlBoard/fanButton";

const ControlBoard = (props: any): ReactNode => {

    return (
        <div className=" h-full w-full p-3 border-l overscroll-auto border-gray-300" >
            <div className="h-full md:h-2/3 w-full flex flex-col md:flex-row">
                <div className="h-1/2 w-full md:h-full md:w-1/2 p-3">
                    <ControlBoardChart />
                </div>
                <div className="h-1/2 w-full md:h-full md:w-1/2 p-3">
                    <ControlBoardChart/>
                </div>
            </div>
            <div className="h-1/3 w-full flex">
                <div className="h-full w-1/3 md:w-1/2 p-3">
                    <LedButton />
                </div>
                <div className="h-full w-2/3 md:w-1/2 p-3">
                    <FanButton />
                </div>
            </div>
        </div>
    )
}

export default ControlBoard;