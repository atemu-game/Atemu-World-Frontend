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

const useFuelSocketData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleReconnection = async () => {
      if (!socketFuelApi) {
        console.log('Attempting to reconnect...');
        try {
          await connectSocketFuel();
          console.log('Reconnected successfully');
        } catch (error) {
          console.error('Failed to reconnect', error);
        }
      }
    };

    handleReconnection();

    if (socketFuelApi && socketFuelApi.active) {
      try {
        socketFuelApi.on(FuelEvents.TOTAL_ONLINE, (data: number) => {
          dispatch(setTotalOnline(data));
        });

        socketFuelApi.on(FuelEvents.WINNER, (data: any) => {
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
      } catch (error) {
        console.error('Error in socket events', error);
      }
    }

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

  return null; // The hook will only handle socket connections and dispatch actions
};

export default useFuelSocketData;
