loan.appointmentdetail = loan.appointmentdetail || {

    showDetail : function () {
        document.getElementById("showDetail").style.display = "block";
        document.getElementById("showUpdateDetail").style.display = "none";
    },
    showUpdateDetail : function () {
        document.getElementById("showDetail").style.display = "none";
        document.getElementById("showUpdateDetail").style.display = "block";
    },
    changeDistribute : function () {
        var value = $("#distribute").val();
        if (value == "1") {
            document.getElementById("saleManager").style.display = "block";
        } else if (value == "2") {
            document.getElementById("saleManager").style.display = "none";
        }
    }

};