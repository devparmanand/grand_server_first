// check-in check-out dates
// Room rate per night 
// Number of room
// optional extra(taxes,service fees,discount)
//
function calculateBookingCost(checkIn=2025-4-20,checkOut=2025-4-25,ratePerNight=1200,numRooms=1,taxRate=0.1) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut)

    const timeDiff = checkOutDate-checkInDate
    const nights = Math.ceil(timeDiff/(1000*60*60*24));
    if(nights <= 0){
        throw new Error("Check-out must be after check-in")
    }
    const baseCost = nights*ratePerNight*numRooms;
    const tax = baseCost*taxRate;
    const total=baseCost*tax;
    return{
        nights,
        baseCost,
        tax,
        total
    }
}

