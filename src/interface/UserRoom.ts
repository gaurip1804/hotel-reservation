export interface ICreateBooking {
    id:number 
    firstName : string | undefined
    lastName : string | undefined
    stay : {
        arrivalDate: string | undefined
        departureDate : string | undefined
    }
    email: string | undefined
    payment: string | undefined
    phone : string | undefined
    addressStreet : {
        streetName: string,
		streetNumber: number
    }
    addressLocation: {
		zipCode: string,
		state: string | null,
		city: string
	  },
      extras: string[],
	  note: string,
      reminder: boolean | true,
	  newsletter: boolean | true,
	  confirm: boolean | true,
      room: {
		roomSize: string | undefined,
		roomQuantity: number | 0
	  },
      tags:string[]

}