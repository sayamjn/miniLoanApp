function toggleDashboards(selectedDashboard) 
{
    // Created an object to store dashboard elements by their IDs
    const dashboards = 
    {
        'approved-loan': document.getElementById("approved-loan"),
        'pending-loan': document.getElementById("pending-loan"),
        'paid-loan': document.getElementById("paid-loan"),
        'rejected-loan': document.getElementById("rejected-loan")
    };

    // Hide all dashboards by default
    for (const dashboardId in dashboards) 
    {
        dashboards[dashboardId].style.display = 'none';
    }

    // Display the selected dashboard, if it exists
    if (dashboards[selectedDashboard]) 
    {
        dashboards[selectedDashboard].style.display = 'block';
    }
}
