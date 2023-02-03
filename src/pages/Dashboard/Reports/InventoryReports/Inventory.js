import React, { useEffect, useState } from 'react';
import Print from '../../../Shared/Print';
import CurrentStockSR from './CurrentStockSR';
import InventoryReport from './InventoryReport';

const Inventory = () => {
 
    return (
      <div>
           <div className='border-pink-400 rounded-lg border-b '>
           <CurrentStockSR/>
           </div>
           <div className='border-pink-400 rounded-lg border-b '>
          <InventoryReport/>
           </div>
          
        </div>
    );
  };

export default Inventory;