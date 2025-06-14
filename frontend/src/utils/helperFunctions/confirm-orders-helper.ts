import toast from "react-hot-toast";

export const validateCourierShipmentTypes = (
  orders: any,
  couriersShipmentTypes: any
) => {
  // to keep orders without shipment type option
  let ordersWithoutShipmentType = [];
  let invalidShipmentTypeOrders = [];

  for (const selectedOrder of orders) {
    if (!selectedOrder.shipmentType) {
      ordersWithoutShipmentType.push({
        id: selectedOrder.orderId,
        name: selectedOrder.name,
      });
      toast.error(
        `Shipment Option for order ${selectedOrder.name} is required before assigning it to courier`
      );
    }
    // check selected shipment option exists for selected courier
    /*  values inside isShipmentTypeValidForCourier
            courierShipmentType.label = next day
            selectedOrder.shipmentType = next day
            courierShipmentType.courier = tpl
            selectedOrder.courier = tpl
        */

    // check selected shipment option exists for selected courier
    const isShipmentTypeValidForCourier = couriersShipmentTypes.some(
      (courierShipmentType: any) =>
        courierShipmentType.courier === selectedOrder.courier.toLowerCase() &&
        courierShipmentType.label === selectedOrder.shipmentType
    );

    // check if selected courier is not from one of these. These are couriers which do not require shipment type
    const courierRequiresShipmentType = !(
      selectedOrder.courier.toLowerCase() === "postex" ||
      selectedOrder.courier.toLowerCase() === "m&p" ||
      selectedOrder.courier.toLowerCase() === "trax"
    );

    if (
      selectedOrder.shipmentType &&
      !isShipmentTypeValidForCourier &&
      courierRequiresShipmentType
    ) {
      invalidShipmentTypeOrders.push({
        id: selectedOrder.orderId,
        name: selectedOrder.name,
      });
      toast.error(
        `Invalid shipment option selected for order ${selectedOrder.name} on courier ${selectedOrder.courier}`,
        { autoClose: false } as any
      );
    }
  }
  return { ordersWithoutShipmentType, invalidShipmentTypeOrders };
};

export const removeInvalidShipmentTypeOrders = (
  orders: any,
  invalidOrders: any
) => {
  if (invalidOrders.length > 0) {
    return orders.filter((order: any) =>
      invalidOrders.some(
        (invalidOrder: any) => order.orderId === invalidOrder.id
      )
    );
  }
  return orders;
};

export const getCourierOrdersObject = (bulkSelectedOrders: any) => {
  /*
    get orders in the form of array and convert to object
    e.g:
    [{id: 123, courier: 'tpl', number: 1050}] => {tpl: [{id: 123, courier: 'tpl', number: 1050}]}
*/
  let courierOrdersObj: any = {};
  bulkSelectedOrders.forEach((orderFromBulkSelection: any) => {
    // if courier key exists then add element with existing elements
    if (courierOrdersObj.hasOwnProperty(orderFromBulkSelection.courier)) {
      courierOrdersObj[orderFromBulkSelection.courier] = [
        orderFromBulkSelection,
        ...courierOrdersObj[orderFromBulkSelection.courier],
      ];
    } else {
      courierOrdersObj[orderFromBulkSelection.courier] = [
        orderFromBulkSelection,
      ];
    }
  });
  return courierOrdersObj;
};
