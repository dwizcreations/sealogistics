(function () 
{
  let reduction  = 20;
  let pixelsTravelledPerSecond = 100;
  
  function generateParthCoords( coordA, coordB )
  {
    const DATA = [];

    if( !coordA?.left || !coordB?.left ) return DATA;


    let horizontalDistance = Math.abs( coordA.left - coordB.left );
    let verticalDistance   = Math.abs( coordA.top - coordB.top );

    let increaseleft = coordA.left < coordB.left;
    let increaseTop  = coordA.top  < coordB.top;

    console.log( "A: ", coordA, " B: ", coordB, " increaseleft: ", increaseleft, " increaseTop: ", increaseTop );


    var a = coordA.left;
    var b = coordA.top;

    var totalSteps = horizontalDistance+verticalDistance;
    var xDiff = horizontalDistance / totalSteps;
    var yDiff = verticalDistance / totalSteps;

    let prevA = null;
    for( var i = 0; i < totalSteps;i++)
    {
        a = increaseleft ? a + xDiff : a - xDiff;
        b = increaseTop  ? b + yDiff : b - yDiff;

        if( i%reduction != 0 && i != ( totalSteps - 1 ) ) continue;

        if( !prevA || prevA != Math.floor( a ) )
        {
          let arr = [ Math.floor( a ), i == ( totalSteps - 1 ) ? Math.ceil( b ) : Math.floor( b ) ] ;
          DATA.push( arr );

          //console.log( a, b, xDiff, yDiff, arr );

          prevA = Math.floor( a );
        }
    }

    return DATA;
  }

  function getTravelDuration( coordA, coordB )
  {
    if( !coordA?.left || !coordB?.left ) return 0;

    let horizontalDistance = Math.abs( coordA.left - coordB.left );
    let verticalDistance   = Math.abs( coordA.top - coordB.top );

    var totalSteps = horizontalDistance+verticalDistance;

    return totalSteps / pixelsTravelledPerSecond;
  }

  function setVesselXDirection( vessel, coordB )
  {
    if( !vessel || !vessel?.coord?.left || !coordB?.left ) return null;

    let isGoingLeft = vessel.coord.left > coordB.left;

    console.log("[setVesselXDirection] isGoingLeft: ", isGoingLeft, " previous travel direction: ", vessel.travelDirection, vessel.getElement() );

    if( isGoingLeft && vessel.travelDirection == "right" )
    {
      vessel.getElement().style.transform = "rotateY(180deg)";
      vessel.travelDirection = "left";
    }
    else if( !isGoingLeft && vessel.travelDirection == "left" )
    {
      vessel.getElement().style.transform = "rotateY(0deg)";
      vessel.travelDirection = "right";
    }
    
  }

  window.utils = { generateParthCoords:generateParthCoords, getTravelDuration:getTravelDuration, setVesselXDirection:setVesselXDirection };
})();