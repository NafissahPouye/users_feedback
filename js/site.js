function generatingComponent(vardata){
  var reqs = dc.rowChart('#rd') ;
  var use = dc.rowChart('#pp') ;
  var orgs = dc.rowChart('#org') ;
  var Rstate = dc.rowChart ('#State') ;
 // var Rstatus = dc.pieChart ('#Status') ;
  var Rtype = dc.pieChart ('#type') ;
  var colors = ['#FAE61E','#03a9f4','#E67800','#C80000','#E6E6FA', '#023858', '#a6bddb','#3690c0'] ;

var cf = crossfilter(vardata);
var all = cf.groupAll();
var colors = ['#2C5197','#0B0B61'] ;
var stateDim = cf.dimension(function(d) { return d.dataset});
var stateGroup = stateDim.group();
/*var RtypeDim = cf.dimension(function(d) { return d.contact});
var RtypeGroup = RtypeDim.group();
var statusDim = cf.dimension(function(d) {return d.feedback});
var statusGroup = statusDim.group();*/
var reqDim = cf.dimension(function(d) {return d.feedback});
var reqGroup = reqDim.group();
var useDim = cf.dimension(function(d) {return d.affiliation});
var useGroup = useDim.group();
var orgDim = cf.dimension(function(d) {return d.organisation});
var orgGroup = orgDim.group();

//pie charts
   
/*Rstatus.width($('#status').width(300)).height(200)
        .dimension(statusDim)
        .group(statusGroup); 
    Rstatus.ordinalColors(['#C0D7EB','#007CE1']);
   Rtype.width($('#type').width()).height(150)
        .dimension(RtypeDim)
        .group(RtypeGroup)
    .data(function(group) {
                return group.top(4);
            }); 
    Rtype.ordinalColors(['#C0D7EB','#007CE1', '#E6E7E8']);
// rowCharts*/
  reqs.width(450).height(450)
            .dimension(reqDim)
            .group(reqGroup)
             .elasticX(true)
             .data(function(group) {
                return group.top(15);
            })
            .colors('#FF8C00')
            .colorAccessor(function(d, i){return 0;});
            /*reqs.renderVerticalGridLines(false);
            reqs.renderVerticalGridLines(false);*/
 Rstate.width(450).height(450)
            .dimension(stateDim)
            .group(stateGroup)
             .elasticX(true)
             .data(function(group) {
                return group.top(15);
            })
            .colors('#FF8C00')
            .colorAccessor(function(d, i){return 0;});
            /*reqs.renderVerticalGridLines(false);
            reqs.renderVerticalGridLines(false);*/


  use.width(450)
     .height(450)
            .dimension(useDim)
            .group(useGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(20);
            })
            .colors('#FF8C00')
            .colorAccessor(function(d, i){return 0;});
            /*use.renderVerticalGridLines(false);
            use.renderVerticalGridLines(false);*/
            
   orgs.width(450)
     .height(450)
            .dimension(orgDim)
            .group(orgGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(20);
            })
            .colors('#FF8C00')
            .colorAccessor(function(d, i){return 0;})
            .gap(5);         
                

  dc.dataCount('count-info')

    .dimension(cf)

    .group(all);

  
  dc.renderAll();
     

}

var dataCall = $.ajax({

    type: 'GET',

    url: 'data/data.json',

    dataType: 'json',

});

var geomCall = $.ajax({

    type: 'GET',

    url: 'data/cmr.geojson',

    dataType: 'json',

});

$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){

    var geom = geomArgs[0];

    geom.features.forEach(function(e){

        e.properties['NAME'] = String(e.properties['NAME']);

    });

    generatingComponent(dataArgs[0],geom);

});