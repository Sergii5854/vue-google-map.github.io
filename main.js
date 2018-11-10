document.addEventListener("DOMContentLoaded", function (event) {

    Vue.component('vue-map', {
        template: '#map',
        props: {

            locations: {
                type: Array,
                default: function () {
                    return []
                }
            },
        },
        data: function () {
            return {
                cluster: null,
                map: null,
                markers: [],
                infos: [],
                option: {
                    center: {lat: 48.5, lng: 2.2},
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [
                        {
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#d3d3d3"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [
                                {
                                    "color": "#808080"
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#b3b3b3"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "weight": 1.8
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#d7d7d7"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ebebeb"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#a7a7a7"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#efefef"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#696969"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#737373"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#d6d6d6"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {},
                        {
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#dadada"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        mounted: function () {
            let el = this.$el;
            this.map = new google.maps.Map(el, this.option);

            this.$emit('input', this.map);

            let bounds = new google.maps.LatLngBounds();


            for (let i = 0; i < this.locations.length; i++) {
                let position = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
                bounds.extend(position);
                this.setMarker(this.locations[i]);
            }


            this.map.fitBounds(bounds);


        },



        methods: {
            // set marker

                setMarker(pos)
                {
                    let latlng = new google.maps.LatLng(pos.lat, pos.lng);
                    let marker = new google.maps.Marker({
                        position: latlng,
                        map: this.map,
                        title: pos.title,
                        icon: null,
                    });
                    let content = `<div id="content">
						<h1 id="firstHeading" class="firstHeading">${pos.title}</h1>
						<img width="100%" height="auto" src='${pos.image}'>
						<div id="bodyContent">
							<p>${pos.description}</p>
						</div>
					</div>`;


                    let info = new google.maps.InfoWindow({
                        content: content,
                        maxWidth: 180
                    });


                    this.infos.push(info);
                    this.markers.push(marker);

                    // // Events for marker
                    marker.addListener('click', () => {
                        this.infos.forEach((i) => {
                            i.close();
                        });
                        info.open(this.map, marker);
                    });


            },
            clearMarker() {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
                this.marker = [];
            }


        },
        watch: {

            locations: function () {
                this.clearMarker();
                let bounds = new google.maps.LatLngBounds();

                for (let i = 0; i < this.locations.length; i++) {
                    let position = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
                    bounds.extend(position);
                    this.setMarker(this.locations[i]);

                }


                ClusterIcon.prototype.createCss = function (pos) {
                    var size = 15;
                    if (this.cluster_.getMarkers().length < 5) { size = 15; }
                    if (this.cluster_.getMarkers().length > 5 && this.cluster_.getMarkers().length < 10) { size = 17; }
                    if (this.cluster_.getMarkers().length > 10 && this.cluster_.getMarkers().length < 100) { size = 30; }
                    if (this.cluster_.getMarkers().length > 100) { size = 37; }

                    style = ['border-radius : 50%',
                        'cursor        : pointer',
                        'position      : absolute',
                        'top           : ' + pos.y + 'px',
                        'left          : ' + pos.x + 'px',
                        'width         : ' + size * 2 + 'px',
                        'height        : ' + size * 2 + 'px',
                        'line-height   : ' + (size * 2 + 1) + 'px',
                        'text-align    : center',
                        'background-color: rgba(76, 76, 72, 0.9)',
                        'color: #ffffff',
                        'font-size:14px'
                    ];
                    return style.join(";") + ';';
                };


                this.cluster = new MarkerClusterer(this.map, this.markers, {
                    averageCenter: true,
                    styles:[{
                        url: "http://pluspng.com/img-png/circle-png-orange-round-circle-paint-brush-design-element-709.png",
                        width:27,
                        height:27,
                        fontFamily:"comic sans ms",
                        textSize:15,
                        textColor:"#2e2e2e",

                    }]

                });

                this.map.fitBounds(bounds);
            }
        }
    })

    let mc = new Vue({
        el: '#mainViewContainer',
        data: {

            place: [],
            locations: [],
            map: null
        },
        created: async function () {
            this.locations = await getFakeLocation();
        },
        computed: {
            modifiedPlace: async function () {
                this.locations = await getFakeLocation();
            }
        }

    })

    let vm = new Vue({
        el: '#app',
        data: {
            locations: [],
            map: null
        },
        created: async function () {
            this.locations = await getFakeLocation();
        }

    });


    function getFakeLocation() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(fakeLocation)
            }, 1000)
        })
    }

    const fakeLocation = [
        {
            "id": 1,
            "title": "Place de la Bastille",
            "description": "French Revolution Landmark",
            "lat": 48.853354,
            "lng": 2.369491,
            "image": "https://www.gpsmycity.com/img/gd_attr/5664.jpg"
        },
        {
            "id": 2,
            "title": "Place du Châtelet",
            "description": "French Revolution Landmark",
            "lat": 48.857573,
            "lng": 2.347030,
            "image": "https://www.gpsmycity.com/img/gd_attr/6323.jpg"
        },
        {
            "id": 3,
            "title": "Pavillng de Flore",
            "description": "French Revolution Landmark",
            "lat": 48.861111,
            "lng": 2.330556,
            "image": "https://www.gpsmycity.com/img/gd_attr/6345.jpg"
        },
        {
            "id": 4,
            "title": "Tuileries Gardens",
            "description": "French Revolution Landmark",
            "lat": 48.863721,
            "lng": 2.332081,
            "image": "https://www.gpsmycity.com/img/gd_attr/6351.jpg"
        },
        {
            "id": 5,
            "title": "Place de la Concorde",
            "description": "French Revolution Landmark",
            "lat": 48.865633,
            "lng": 2.321236,
            "image": "https://www.gpsmycity.com/img/gd_attr/6360.jpg"
        },
        {
            "id": 6,
            "title": "Assemblée Nationale",
            "description": "French Revolution Landmark",
            "lat": 48.862017,
            "lng": 2.318682,
            "image": "https://www.gpsmycity.com/img/gd_attr/6430.jpg"
        },
        {
            "id": 7,
            "title": "Les Invalides",
            "description": "French Revolution Landmark",
            "lat": 48.858419,
            "lng": 2.312933,
            "image": "https://www.gpsmycity.com/img/gd_attr/6433.jpg"
        },
        {
            "id": 8,
            "title": "Musée de Cluny",
            "description": "Atlas Obscura",
            "lat": 48.8472,
            "lng": 2.3444,
            "image": "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2FhZjZhZjk3Yzg1MjViZDkzYV9JTUdfOTIxMC5KUEciXSxbInAiLCJjb252ZXJ0IiwiLXF1YWxpdHkgODEgLWF1dG8tb3JpZW50Il0sWyJwIiwidGh1bWIiLCIzNzJ4MjQ4IyJdXQ"
        },
        {
            "id": 9,
            "title": "Père Lachaise Cemetery",
            "description": "Atlas Obscura",
            "lat": 48.8594,
            "lng": 2.3910,
            "image": "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2Z3cTlyY25teHZlZWIxNzNlZTQ4ZGYzNzQwZTMwX0RTQzAwMDQ2LkpQRyJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXSxbInAiLCJ0aHVtYiIsIjM3MngyNDgjIl1d/DSC00046.JPG"
        },
        {
            "id": 10,
            "title": "Musée des Arts et Métiers",
            "description": "Atlas Obscura",
            "lat": 48.8666,
            "lng": 2.3555,
            "image": "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzLzIzMDQyNjM0MDBfNGI2Y2QzMzYxZV9vLmpwZyJdLFsicCIsInRodW1iIiwiMTAwMHg2NjcrMjMrMTMiXSxbInAiLCJjb252ZXJ0IiwiLXF1YWxpdHkgODEgLWF1dG8tb3JpZW50Il0sWyJwIiwidGh1bWIiLCIzNzJ4MjQ4IyJdXQ/2304263400_4b6cd3361e_o.jpg"
        },
        {
            "id": 11,
            "title": "Gustave Eiffel's Secret Apartment",
            "description": "Atlas Obscura",
            "lat": 48.8584,
            "lng": 2.2945,
            "image": "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2Y1ZDkxOGMwNDk0NGQyMTI3MV8zMzg0MzkwNDYyX2ZiYTM1ZDFhYmNfYi5qcGciXSxbInAiLCJjb252ZXJ0IiwiLXF1YWxpdHkgODEgLWF1dG8tb3JpZW50Il0sWyJwIiwidGh1bWIiLCIzNzJ4MjQ4IyJdXQ"
        },
        {
            "id": 12,
            "title": "Musée des Arts Forains",
            "description": "Atlas Obscura",
            "lat": 48.8331,
            "lng": 2.3889,
            "image": "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzLzY3ODZiYTFjNjI4MGM0OTIyYl9tdXNlZWRlc2FydHNmb3JhaW5zMTMuanBnIl0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDgxIC1hdXRvLW9yaWVudCJdLFsicCIsInRodW1iIiwiMzcyeDI0OCMiXV0"
        },
        {
            "id": 13,
            "title": "Du Pain et des Idées",
            "description": "Food & Drink",
            "lat": 48.871245,
            "lng": 2.362890,
            "image": "http://www.travelproper.com/wp-content/uploads/2014/03/Inside-Du-Pain-et-Des-Idees.jpg"
        },
        {
            "id": 14,
            "title": "Harry's New York Bar",
            "description": "Food & Drink",
            "lat": 48.8692,
            "lng": 2.3321,
            "image": "http://d2aw2z0fz689pv.cloudfront.net/cache/img/f76f02e67fb5c76467ca0f244e3af38d64603c43--920-520-crop.jpeg?q=1501790542"
        }
    ]


});