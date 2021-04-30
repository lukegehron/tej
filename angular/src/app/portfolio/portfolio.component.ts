import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements AfterViewInit {
  // constructor() { }

 
  filter: string = ""
  dataToShow: Array<any> = []
  
  currentDataItem: any;
  dataItems: Array<any>;
  projects: Array<any>;

  private map;
  marker: any;
  popup: any;
  started: boolean = false;
  key: string = "loc"

  

  markerList: Array<any> = [];

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [ 39.8282, -98.5795 ],
    //   zoom: 3
    // });

    this.map = L.map('map', {
      center: [ 42.2023803, -71.7949124 ],
      zoom: 8
    });

    // 42.4023803,-71.7949124,10z

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    const tiles = L.tileLayer('	https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  constructor() { 

    this.projects = [
      {
        "title" : "50 York Apartments",
        "place" : "Cambridge, MA",
        "headerImage" : "1.jpg",
        "description" : [ "16 rental units", "3-story building over parking garage"],
        "client": "Just-A-Start Corp",
        "otherImages" : [ "1-1.jpg", "1-2.jpg"],
        "completion": 2019,
        "cost":"6,000,000",
        "tags" : [ "Multi Family Housing", "New Construction" ],
        "latitude": 42.1023803,
        "longitude": -71.6949124,
        "address": "124 Mulberry st",
        "designChallenge": "Replace a church building that had been converted into 16 units of housing in the 1990s destroyed by fire with a new building that reflected the character of the duplex and triple decker neighborhood.",
        "designApproach": "The decision was made early in the process to not replicate the historic church building that had been destroyed by fire. However, it was decided that pieces of the church – most notably the prominent round stained glass window – would be incorporated into the facade of the new building. In order to provide 16 units of affordable rental housing, the building clearly had to be larger than the buildings in the surrounding neighborhood – primarily duplexes and triple deckers. Accordingly, we designed the single large building in such a way that the building façade stepped in and out to create the appearance of a collection of smaller triple decker scaled buildings. We also used varying colors and siding types to further break down the scale of a single building into a collection of smaller buildings."

        
      },{
        "title" : "Bishop Allen",
        "place" : "Cambridge, MA",
        "headerImage" : "2.jpg",
        "description" : [ "4 Buildings, scattered site",
        "32 units affordable rental housing",
        "40,000sf",
        "Exterior envelope modernization – siding, windows roofing",
        "Interior renovation all finishes, systems, kitchens, bathrooms.",
        "2 handicap accessible apartments"],
        "client": "",
        "otherImages" : [ "2-1.jpg", "2-2.jpg", "2-3.jpg"],
        "completion": 2015,
        "cost":"7,500,000",
        "tags" : [ "Multi Family Housing", "Historic Preservation", "Renovation/Modernization" ],
        "latitude": 42.3023803,
        "longitude": -71.1949124,
        "address": "124 Mulberry st",
        "designChallenge": "Renovate and modernize 32 affordable rental units in four historic buildings in Mid-Cambridge.",
        "designApproach": "These four buildings were located at same corner in a busy urban area in Mid-Cambridge and were registered with the Cambridge Historical Commission (CHC). The building exteriors needed substantial repair and we recommended that our client take this opportunity to not only restore the exterior appearance but do so in a way that added energy efficiency and material that would have longer term sustainability. We recommended use of cementitious siding and a wood trim product from New Zealand that was impervious to water damage. The Cambridge Historic Commission approved this novel approach for the exterior. We also recommended use of rigid board insulation underneath this new siding, providing a continuous insulation seal that the building never had. We used the water impervious wood from New Zealand to reproduce the original trim details and selected paint colors typical of the era in which the buildings were originally built. We provided all new interior finishes, MEP systems, flooring, kitchens and bathrooms as well as retaining as much of the interior trim work the common areas as possible (front stairways in particular)"
      },{
        "title" : "Charlesbank",
        "place" : "Boston, MA",
        "headerImage" : "3.jpg",
        "description" : [ "274 apartments in 26 story building built in the 1960’s.",
          "Replace all windows.",
          "Replace heating/cooling systems.",
          "Redesign entry lobby, laundry room, community rooms, offices.",
          "Create 12 new handicap accessible apartments"],
        "client": "",
        "otherImages" : [ "3-1.jpg", "3-2.jpg", "3-3.jpg"],
        "completion": 2017,
        "cost":"",
        "tags" : [ "Multi Family Housing", "Renovation/Modernization" ],
        "latitude": 42.1523803,
        "longitude": -71.5949124,
        "address": "124 Mulberry st",
        "designChallenge": "Replace all windows and doors in this 274 affordable rental housing units, 24 story building built in the 19060s. Design new lobby and entry system. Upgrade all existing mechanical electrical and plumbing systems.",
        "designApproach": "This project began with the need to provide significant energy efficient upgrades to the 50 year old building – including a new heating and cooling system as well as replacing energy inefficient windows and doors. The scope of work grew as other aspects of the building were also in need of upgrading. We worked with the Owner and our consulting engineers to design new windows and well as to redesign the entry lobby for a more energy efficient entry system, laundry room, community meeting rooms and offices. In addition, we completely renovated 12 of the units into fully handicap accessible apartments. Our work was complicated by the fact that the building would be occupied during the entire year long construction phase, requiring particular attention to scheduling and administration to minimize disruption for the residents."
      },{
        "title" : "Greendale Village",
        "place" : "Needham, MA",
        "headerImage" : "4.jpg",
        "description" : [ "5 acre parcel",
          "20 – 3 BR homes for sale",
          "55+ housing with master bedroom on first floor",
          "2 car garage"],
        "client": "SEB Development Corp, LLC",
        "otherImages" : [ "4-1.jpg", "4-2.jpg"],
        "completion": 2016,
        "cost":"5,000,000",
        "tags" : [ "Multi Family Housing", "New Construction" ],
        "latitude": 42.6023803,
        "longitude": -71.2949124,
        "address": "124 Mulberry st",
        "designChallenge": "Design a 22 unit affordable housing development on 5 acres using single family and duplex building types for the 55+ age group with master bedroom suites on the first floor along with a 2 car garage.",
        "designApproach": "This housing type has a wide footprint due to the inclusion of a master bedroom suite and garage on the first floor. With such a large “footprint” the one story building had a large roofline and attic area. We were able to take advantage of this feature and locate 2 additional bedrooms in the “attic area of the building through the use of shed and gable dormers. The resulting buildings have a one story eave line and create a single family image for this multifamily housing. We also designed the buildings using typical in New England style detailing – such as front porches, Gables, varied siding materials, etc. The design of this project was instrumental in helping our client receive the necessary zoning approvals for this affordable housing development."
      },{
        "title" : "Pelham Lifelong Learning Center",
        "place" : "Framingham, MA",
        "headerImage" : "5.jpg",
        "description" : [ "8,000 SF 2-story community center","New focal point for 500 unit affordable housing complex"],
        "client": "Pelham Lifelong Learning Center, Inc",
        "otherImages" : [ "5-1.jpg", "5-2.jpg", "5-3.jpg"],
        "completion": 2020,
        "cost":"3,000,000",
        "tags" : [ "Community Center", "New Construction" ],
        "latitude": 42.0023803,
        "longitude": -71.4949124,
        "address": "124 Mulberry st",
        "designChallenge": "Design a community facility that would be starkly different from the surrounding 2 story brick apartment buildings – offering an inspiration and a place of which the community could be proud. Unlike other projects where the task is to blend in, the intent here is to stand out.",
        "designApproach": "Pelham Apartments consists of approximately 500 units of housing with over 1,000 children living there. The management company needed space to provide the kinds of services and programs that such a large community needed. Our approach was unlike that of most of our other projects – where we would strive to “fit in”. This project called for a stand out building, one that would not be confused with the many surrounding similar garden apartment buildings. This project provided us with an opportunity to create something truly special – with community spaces, Technology center, library, offices , meeting rooms etc. The 2 story building was designed around a central atrium with skylights and a dramatic staircase and surrounding balcony. The second floor spaces were designed with an angling façade and rising roofline – all in celebration of this community and this center."
      },{
        "title" : "Harvard Square Eyecare",
        "place" : "Cambridge, MA",
        "headerImage" : "6.jpg",
        "description" : [ "Gut renovation of existing storefront building","1,200sf new retail/commercial space", "New storefront display wall"],
        "client": "Harvard Square Eye Care LLC",
        "otherImages" : [ ],
        "completion": 2015,
        "cost":"500,000",
        "tags" : [ "Community Building", "Commercial/Retail" ],
        "latitude": 42.4023803,
        "longitude": -71.1949124,
        "address": "124 Mulberry st",
        "designChallenge": "Convert a storefront previously used as a long-standing bar/restaurant into new retail eye care store.",
        "designApproach": "Our client purchased a bar/restaurant building in the middle of an older strip mall on a main street  – characterized by an eclectic mix of siding and storefront materials.  Our challenge was to provide a new forward looking space within this context that also felt like it fit into the neighborhood.  We completed “gut” renovated the building interiors and storefront wall.  We designed a new storefront wall with substantial glass and corrugated metal siding with different profiles and colors.  We held the new storefront wall back from the sidewalk to create space for a sloping walkway leading to the new entry for handicap accessibility. The result is a striking appearance that appears both new and old at the same time."
      },
    ]

    this.currentDataItem = this.projects[0]
    let myStr = ""
    console.log(window.localStorage.getItem(this.key))
    if(window.localStorage.getItem(this.key)){//something exists in local storage
      this.filter = window.localStorage.getItem(this.key)
      myStr = window.localStorage.getItem(this.key)
    }
    this.enterFilter(myStr);
    
    
  }
  ngAfterViewInit(): void { 
    this.initMap();

    


    for(let i = 0; i < this.projects.length; i++){
      this.pos.latitude = this.projects[i].latitude
      this.pos.longitude = this.projects[i].longitude
      this.content = `<div>Project: ${this.projects[i].title}</div>` +
      `<div>Location: ${this.projects[i].address}</div>`
      +
      `<div style="width:100%"><img src="./assets/${this.projects[i].headerImage}"  height='100' style="margin:auto"/></div>`
      this.addMarker(this.map, this.pos, this.projects[i].title, this.content);
    }

    this.started = true;
    this.enterFilter(this.filter);
    
  }


  getLocation() {
    
    // asynchronous call with callback success, 
    // error functions and options specified
    
    var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
    };
    
    // let myData = navigator.geolocation.getCurrentPosition(this.showClosest(e, this.dataToShow), this.handleError, options);
    // console.log(myData)

    navigator.geolocation.getCurrentPosition((position) => {
      this.showClosest(position, this.dataToShow);
    });

    
}

//show closest project and zoom
showClosest(position, data){
  // return position
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  let closest = 100000;
  let closestIndex = 0;

  for(let i = 0; i < this.dataToShow.length; i++){
    let absLat = Math.abs(this.dataToShow[i].latitude - latitude)
    let absLon = Math.abs(this.dataToShow[i].longitude - longitude)
    let totalDist = absLat + absLon;
    if (totalDist < closest){
      closest = totalDist;
      closestIndex = i
    }
  }
  this.map.flyTo([latitude, longitude], 10)
  this.markerList[closestIndex].openPopup()
}



handleError(error) {
  switch(error.code) {
      case 1:
          // updateStatus("The user denied permission");
          break;
      case 2:
          // updateStatus("Position is unavailable");
          break;
      case 3:
          // updateStatus("Timed out");
          break;
  }
}

  removeAllMarks(){
    for(let i = 0; i < this.markerList.length; i++){
      this.map.removeLayer(this.markerList[i])
    }
    this.markerList = []
  }


  enterFilter(filter:string){
    this.dataToShow = []
    
    
    if(filter != ""){
      for(let i = 0; i < this.projects.length; i++){
        let showThis = false;
        for(let j = 0; j < this.projects[i].tags.length; j++){
          if(filter.toLowerCase().trim() === this.projects[i].tags[j].toLowerCase().trim()){
            showThis = true;
          }
        }
        if(showThis){
          this.dataToShow.push(this.projects[i])

          
        }
      }
    }else{
      this.dataToShow = this.projects;
    }

    if(this.started){
      this.removeAllMarks();
      for(let i = 0; i < this.dataToShow.length; i++){
        this.pos.latitude = this.dataToShow[i].latitude
        this.pos.longitude = this.dataToShow[i].longitude
        this.content = `<div>Project: ${this.dataToShow[i].title}</div>` +
        `<div>Location: ${this.dataToShow[i].address}</div>`
        this.addMarker(this.map, this.pos, this.dataToShow[i].title, this.content);
      }
    }

    //add filter to local storage
    window.localStorage.setItem(this.key, filter);
   
  }
  
  pos = {
    latitude: 42.4023803,
    longitude: -71.7949124
  }

    // add the marker to the map
    title = "Location Details";
    content = "Lat: " + this.pos.latitude + 
                    ", Long: " + this.pos.longitude;
                    
    

    // add position marker to the map

// }



addMarker(map: any, pos: any, title: any, content: any) {
   
  this.marker = L.marker([pos.latitude, pos.longitude]).addTo(map);
  this.markerList.push(this.marker)
  this.popup = L.popup().setLatLng([pos.latitude, pos.longitude])
  .setContent(content);

  this.marker.bindPopup(content);

  // this.marker.on('click', function(e) {
  //     this.popup.openOn(this.map);
  // });
  
}

  // ngOnInit() {
    
  //   console.log(this.dataItems)
  // }

  setValue(val:number){
    this.currentDataItem = val
    console.log(val)
    document.getElementById("popup-holder")!.style.visibility='visible';

  }

  close(){
    document.getElementById("popup-holder")!.style.visibility='hidden';
  }

}
