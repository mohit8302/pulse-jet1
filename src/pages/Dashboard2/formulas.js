import { t } from "numeric";
import * as math from 'mathjs';

export const calculateCOP = (outletTemp,blowerPressure,exhaustPressure,inletTemp,tempAtCC,fuelIntake,machNo) => {
      let h= calculateConnectiveHT(outletTemp,tempAtCC,exhaustPressure);
      let n=calculateEfficiency(blowerPressure,fuelIntake,inletTemp,outletTemp,machNo,exhaustPressure);
      let t1=inletTemp;
      let t3=outletTemp;
      let p1=blowerPressure;
      let p3=exhaustPressure;

      let sol=(0.2226*h)/(n*(t3*p1-p3*t1));
      return sol.toFixed(4);

  }

export const calculateConnectiveHT=(outletTemp,tempAtCC,exhaustPressure)=>{

    let t3=outletTemp
    let p2=tempAtCC
    let p3=exhaustPressure
    let val=(14.846*t3)*(1-(p2/p3))

    return val.toFixed(4)
     
}



export const  calculateReynoldsNumber=(exitVelocity)=>{
    let v=exitVelocity;
    let sol=(0.4*v)/(3.178*((10)**(-5)));
    return sol.toFixed(4);
}


export const calculateEfficiency=(blowerP,fuelIntake,inletTemp,outletTemp,machNo,exhaustPressure,)=>{
    const M=machNo;
    const p1=blowerP;
    const p3=exhaustPressure;
    const t1=inletTemp;
    const t3=outletTemp;
    const m=fuelIntake;

    let sol=((1+0.7*(M**2))**2.5)*(1+p1)*(t3*p1-p3*t1)/(20.785*m*t1)
    return sol.toFixed(4);
}


export const  calculatePrRatio=(machNo)=>{
    let M=machNo;
    let sol=(1+(0.2)*(M**2))**3.5;
    return sol.toFixed(4);
}


export const  calculateSpStRatio=(inletTemp,outletTemp,blowerPressure,exhaustPressure)=>{
    let t1=inletTemp;
    let t3=outletTemp;
    let p1=blowerPressure;
    let p3=exhaustPressure;
    let sol=((p1-p3)/(t1-t3))
    return sol.toFixed(4)
}

export const calculateMachNumber=(exitVelocity)=>{
    let v=exitVelocity;
    return (v/331.3).toFixed(4);
}

export const calculateSpecificImpulse=(exhaustPressure,fuelIntake)=>{
     let n = (exhaustPressure)/((0.015)*(fuelIntake));
     return n.toFixed(3);
}


