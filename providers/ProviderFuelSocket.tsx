'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { connectSocketFuel, socketFuelApi } from '@/config/socketFuelConfig';
import { FuelEvents } from '@/utils/constants';
import {
  setTotalOnline,
  setWinner,
  setCurrentPool,
  setListPlayer,
  setTotalPoint,
} from '@/redux/fuel/fuel-slice';

const ProviderFuelSocket = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSocket = async () => {
      if (!socketFuelApi || !socketFuelApi.active) {
        try {
          await connectSocketFuel();
        } catch (error) {
          console.error('Failed to connect to Fuel socket', error);
          return;
        }
      }

      // Listen to socket events and dispatch to Redux
      if (socketFuelApi && socketFuelApi.active) {
        socketFuelApi.on(FuelEvents.TOTAL_ONLINE, (data: number) => {
          dispatch(setTotalOnline(data));
        });

        socketFuelApi.on(FuelEvents.WINNER, (data: any) => {
          console.log('winner', data);
          dispatch(setWinner(data));
        });

        socketFuelApi.on(FuelEvents.CURRENT_POOL, (data: any) => {
          dispatch(setCurrentPool(data));
        });

        socketFuelApi.on(FuelEvents.CURRENT_JOINED_POOL, (data: any[]) => {
          dispatch(setListPlayer(data));
        });

        socketFuelApi.on(FuelEvents.TOTAL_POINT, (data: number) => {
          dispatch(setTotalPoint(data));
        });
        socketFuelApi.on(FuelEvents.CREATE_POOL_TX_HASH, (data: any) => {
          dispatch(setWinner(null));
        });
      }
    };

    initializeSocket();

    // Clean up on unmount
    return () => {
      if (socketFuelApi) {
        socketFuelApi.off(FuelEvents.TOTAL_ONLINE);
        socketFuelApi.off(FuelEvents.TOTAL_POINT);
        socketFuelApi.off(FuelEvents.CURRENT_JOINED_POOL);
        socketFuelApi.off(FuelEvents.WINNER);
        socketFuelApi.disconnect();
      }
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default ProviderFuelSocket;
