Attribute VB_Name = "EcomOperations"
' ============================================================
' E-Commerce Operations Tracking System - VBA Module
' ============================================================
' This module provides interactive functionality for the
' E-Commerce Operations Tracking System without requiring
' a web browser.
' ============================================================

Option Explicit

' ============================================================
' MAIN DASHBOARD FUNCTIONS
' ============================================================

Sub ShowDashboard()
    ' Activate Dashboard sheet and refresh metrics
    Sheets("Dashboard").Activate
    RefreshDashboardMetrics
    MsgBox "Dashboard refreshed successfully!" & vbCrLf & _
           "Review the KPIs and monitoring areas.", vbInformation, "Dashboard"
End Sub

Sub RefreshDashboardMetrics()
    ' Force recalculation of all formulas
    Application.CalculateFullRebuild
    
    ' Update timestamp
    Dim dashSheet As Worksheet
    Set dashSheet = Sheets("Dashboard")
    dashSheet.Range("A2").Value = "Generated: " & Format(Now, "yyyy-mm-dd hh:mm:ss")
    
    ' Update Last Updated timestamps for KPIs
    Dim lastUpdate As String
    lastUpdate = Format(Now, "yyyy-mm-dd hh:mm")
    
    dashSheet.Range("E6").Value = lastUpdate  ' Wave Completion
    dashSheet.Range("E7").Value = lastUpdate  ' Employee Training
    dashSheet.Range("E8").Value = lastUpdate  ' Picking Target
    dashSheet.Range("E9").Value = lastUpdate  ' Quality Audit
    dashSheet.Range("E10").Value = lastUpdate ' System Errors
    dashSheet.Range("E11").Value = lastUpdate ' Inventory Mismatch
    dashSheet.Range("E12").Value = lastUpdate ' SLA Compliance
End Sub

' ============================================================
' BASH QUERY FUNCTIONS
' ============================================================

Sub AddBashQuery()
    ' Show form to add a new Bash query
    On Error Resume Next
    BashQueryForm.Show
    If Err.Number <> 0 Then
        ' If form doesn't exist, use simple input method
        Call AddBashQuerySimple
    End If
    On Error GoTo 0
End Sub

Sub AddBashQuerySimple()
    ' Simple input method without UserForm
    Dim querySheet As Worksheet
    Set querySheet = Sheets("Bash Queries Response")
    
    Dim lastRow As Long
    lastRow = querySheet.Cells(querySheet.Rows.Count, 1).End(xlUp).Row + 1
    
    ' Get input from user
    Dim customerName As String, orderID As String, queryDetails As String
    Dim queryType As String, response As String, respondedBy As String
    
    customerName = InputBox("Enter Customer Name:", "New Query")
    If customerName = "" Then Exit Sub
    
    orderID = InputBox("Enter Order ID:", "New Query")
    If orderID = "" Then Exit Sub
    
    queryType = InputBox("Enter Query Type:" & vbCrLf & _
                        "(Order Status / Delivery Time / Order Issue)", "New Query")
    If queryType = "" Then Exit Sub
    
    queryDetails = InputBox("Enter Query Details:", "New Query")
    If queryDetails = "" Then Exit Sub
    
    response = InputBox("Enter Response (or leave blank if in progress):", "New Query")
    
    respondedBy = InputBox("Enter Your Name:", "New Query")
    If respondedBy = "" Then Exit Sub
    
    ' Generate Query ID
    Dim queryID As String
    queryID = "Q" & Format(lastRow - 1, "000")
    
    ' Add data to sheet
    With querySheet
        .Cells(lastRow, 1).Value = queryID
        .Cells(lastRow, 2).Value = Format(Now, "yyyy-mm-dd hh:mm")
        .Cells(lastRow, 3).Value = customerName
        .Cells(lastRow, 4).Value = orderID
        .Cells(lastRow, 5).Value = queryType
        .Cells(lastRow, 6).Value = queryDetails
        .Cells(lastRow, 7).Value = IIf(response = "", "IN PROGRESS", "RESPONDED")
        .Cells(lastRow, 8).Value = response
        .Cells(lastRow, 9).Value = respondedBy
        
        ' Calculate response time if responded
        If response <> "" Then
            .Cells(lastRow, 10).Value = 5 ' Default 5 minutes
        End If
    End With
    
    MsgBox "Bash query added successfully!" & vbCrLf & _
           "Query ID: " & queryID, vbInformation, "Query Added"
    
    RefreshDashboardMetrics
End Sub

Sub ViewRecentQueries()
    ' Show last 10 queries
    Dim querySheet As Worksheet
    Set querySheet = Sheets("Bash Queries Response")
    
    Dim lastRow As Long
    lastRow = querySheet.Cells(querySheet.Rows.Count, 1).End(xlUp).Row
    
    Dim startRow As Long
    startRow = Application.Max(2, lastRow - 9)
    
    Dim msg As String
    msg = "RECENT BASH QUERIES:" & vbCrLf & String(50, "-") & vbCrLf
    
    Dim i As Long
    For i = startRow To lastRow
        msg = msg & querySheet.Cells(i, 1).Value & " - " & _
              querySheet.Cells(i, 3).Value & " (" & _
              querySheet.Cells(i, 7).Value & ")" & vbCrLf
    Next i
    
    MsgBox msg, vbInformation, "Recent Queries"
End Sub

' ============================================================
' WAVE TRACKING FUNCTIONS
' ============================================================

Sub CheckWaveStatus()
    ' Check and display wave completion status
    Dim waveSheet As Worksheet
    Set waveSheet = Sheets("Wave Tracking")
    
    Dim lastRow As Long
    lastRow = waveSheet.Cells(waveSheet.Rows.Count, 1).End(xlUp).Row
    
    If lastRow < 2 Then
        MsgBox "No wave data found!", vbExclamation, "Wave Status"
        Exit Sub
    End If
    
    Dim totalWaves As Long, completedWaves As Long, delayedWaves As Long
    totalWaves = 0
    completedWaves = 0
    delayedWaves = 0
    
    Dim i As Long
    For i = 2 To lastRow
        totalWaves = totalWaves + 1
        If UCase(waveSheet.Cells(i, 6).Value) = "COMPLETED" Then
            completedWaves = completedWaves + 1
        ElseIf UCase(waveSheet.Cells(i, 6).Value) = "DELAYED" Then
            delayedWaves = delayedWaves + 1
        End If
    Next i
    
    Dim completionRate As Double
    completionRate = (completedWaves / totalWaves) * 100
    
    Dim msg As String
    msg = "WAVE TRACKING STATUS:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Waves: " & totalWaves & vbCrLf & _
          "Completed: " & completedWaves & vbCrLf & _
          "Delayed: " & delayedWaves & vbCrLf & _
          "In Progress: " & (totalWaves - completedWaves - delayedWaves) & vbCrLf & _
          "Completion Rate: " & Format(completionRate, "0.0") & "%" & vbCrLf & vbCrLf
    
    If completionRate >= 95 Then
        msg = msg & "✓ Excellent wave performance!"
    ElseIf completionRate >= 80 Then
        msg = msg & "⚠ Good, but room for improvement"
    Else
        msg = msg & "✗ Wave completion needs attention!"
    End If
    
    MsgBox msg, vbInformation, "Wave Status"
End Sub

Sub AddWaveRecord()
    ' Add a new wave tracking record
    Dim waveSheet As Worksheet
    Set waveSheet = Sheets("Wave Tracking")
    
    Dim lastRow As Long
    lastRow = waveSheet.Cells(waveSheet.Rows.Count, 1).End(xlUp).Row + 1
    
    Dim waveID As String, status As String, notes As String
    
    waveID = "W" & Format(lastRow - 1, "000")
    
    status = InputBox("Enter Wave Status:" & vbCrLf & _
                     "(COMPLETED / DELAYED / IN PROGRESS)", "Wave Tracking")
    If status = "" Then Exit Sub
    
    notes = InputBox("Enter Notes (optional):", "Wave Tracking")
    
    With waveSheet
        .Cells(lastRow, 1).Value = waveID
        .Cells(lastRow, 2).Value = Format(Now, "yyyy-mm-dd hh:mm")
        .Cells(lastRow, 3).Value = Format(Now, "yyyy-mm-dd hh:mm")
        .Cells(lastRow, 4).Value = "" ' End Time (to be filled when complete)
        .Cells(lastRow, 5).Value = 0  ' Duration
        .Cells(lastRow, 6).Value = UCase(status)
        .Cells(lastRow, 7).Value = notes
    End With
    
    MsgBox "Wave record added: " & waveID, vbInformation, "Wave Added"
    RefreshDashboardMetrics
End Sub

' ============================================================
' EMPLOYEE TRAINING FUNCTIONS
' ============================================================

Sub VerifyTraining()
    ' Check employee training status
    Dim trainingSheet As Worksheet
    Set trainingSheet = Sheets("Employee Training")
    
    Dim lastRow As Long
    lastRow = trainingSheet.Cells(trainingSheet.Rows.Count, 1).End(xlUp).Row
    
    If lastRow < 2 Then
        MsgBox "No training data found!", vbExclamation, "Training Status"
        Exit Sub
    End If
    
    Dim totalEmployees As Long, trainedEmployees As Long
    totalEmployees = 0
    trainedEmployees = 0
    
    Dim i As Long
    For i = 2 To lastRow
        totalEmployees = totalEmployees + 1
        If UCase(trainingSheet.Cells(i, 5).Value) = "COMPLETED" Then
            trainedEmployees = trainedEmployees + 1
        End If
    Next i
    
    Dim trainingRate As Double
    trainingRate = (trainedEmployees / totalEmployees) * 100
    
    Dim msg As String
    msg = "EMPLOYEE TRAINING STATUS:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Employees: " & totalEmployees & vbCrLf & _
          "Trained: " & trainedEmployees & vbCrLf & _
          "Not Trained: " & (totalEmployees - trainedEmployees) & vbCrLf & _
          "Training Completion: " & Format(trainingRate, "0.0") & "%" & vbCrLf & vbCrLf
    
    If trainingRate = 100 Then
        msg = msg & "✓ All employees trained!"
    ElseIf trainingRate >= 80 Then
        msg = msg & "⚠ Most employees trained, finish remaining"
    Else
        msg = msg & "✗ Training needs attention!"
    End If
    
    MsgBox msg, vbInformation, "Training Status"
End Sub

' ============================================================
' STOCK REPLENISHMENT FUNCTIONS
' ============================================================

Sub AnalyzeStockIssues()
    ' Analyze stock replenishment delays
    Dim stockSheet As Worksheet
    Set stockSheet = Sheets("Stock Replenishment")
    
    Dim lastRow As Long
    lastRow = stockSheet.Cells(stockSheet.Rows.Count, 1).End(xlUp).Row
    
    If lastRow < 2 Then
        MsgBox "No stock data found!", vbExclamation, "Stock Analysis"
        Exit Sub
    End If
    
    Dim totalRequests As Long, completedRequests As Long
    Dim totalHours As Double, avgHours As Double
    totalRequests = 0
    completedRequests = 0
    totalHours = 0
    
    Dim i As Long
    For i = 2 To lastRow
        totalRequests = totalRequests + 1
        If UCase(stockSheet.Cells(i, 6).Value) = "COMPLETED" Then
            completedRequests = completedRequests + 1
            If IsNumeric(stockSheet.Cells(i, 7).Value) Then
                totalHours = totalHours + stockSheet.Cells(i, 7).Value
            End If
        End If
    Next i
    
    If completedRequests > 0 Then
        avgHours = totalHours / completedRequests
    Else
        avgHours = 0
    End If
    
    Dim msg As String
    msg = "STOCK REPLENISHMENT ANALYSIS:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Requests: " & totalRequests & vbCrLf & _
          "Completed: " & completedRequests & vbCrLf & _
          "Pending: " & (totalRequests - completedRequests) & vbCrLf & _
          "Average Completion Time: " & Format(avgHours, "0.0") & " hours" & vbCrLf & vbCrLf
    
    If avgHours <= 2 Then
        msg = msg & "✓ Excellent replenishment speed!"
    ElseIf avgHours <= 4 Then
        msg = msg & "⚠ Good, but could be faster"
    Else
        msg = msg & "✗ Replenishment taking too long!" & vbCrLf & _
                   "Target: Within 2-4 hours"
    End If
    
    MsgBox msg, vbInformation, "Stock Analysis"
End Sub

' ============================================================
' QUALITY AUDIT FUNCTIONS
' ============================================================

Sub CheckQualityRate()
    ' Check quality audit coverage rate
    Dim qualitySheet As Worksheet, orderSheet As Worksheet
    Set qualitySheet = Sheets("Quality Audit")
    Set orderSheet = Sheets("Order Volumes")
    
    Dim auditCount As Long, totalOrders As Long
    auditCount = qualitySheet.Cells(qualitySheet.Rows.Count, 1).End(xlUp).Row - 1
    
    ' Estimate total orders (simplified)
    totalOrders = orderSheet.Cells(orderSheet.Rows.Count, 1).End(xlUp).Row - 1
    
    If totalOrders = 0 Then totalOrders = 100 ' Default estimate
    
    Dim auditRate As Double
    auditRate = (auditCount / totalOrders) * 100
    
    Dim msg As String
    msg = "QUALITY AUDIT COVERAGE:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Audits: " & auditCount & vbCrLf & _
          "Estimated Orders: " & totalOrders & vbCrLf & _
          "Audit Coverage: " & Format(auditRate, "0.0") & "%" & vbCrLf & vbCrLf
    
    If auditRate >= 10 Then
        msg = msg & "✓ Excellent audit coverage!"
    ElseIf auditRate >= 5 Then
        msg = msg & "⚠ Meeting minimum, aim higher"
    Else
        msg = msg & "✗ Audit rate too low!" & vbCrLf & _
                   "Target: >5% (ideally 10%+)"
    End If
    
    MsgBox msg, vbInformation, "Quality Audit"
End Sub

Sub AdjustQualityRate()
    ' Suggest increasing quality audit rate
    Dim msg As String
    msg = "QUALITY AUDIT RECOMMENDATIONS:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Current Target: >5%" & vbCrLf & _
          "Recommended: 10-15%" & vbCrLf & vbCrLf & _
          "Benefits of higher audit rate:" & vbCrLf & _
          "• Catch more quality issues early" & vbCrLf & _
          "• Reduce customer complaints" & vbCrLf & _
          "• Improve overall accuracy" & vbCrLf & vbCrLf & _
          "Add more quality audit records to increase coverage."
    
    MsgBox msg, vbInformation, "Quality Recommendations"
End Sub

' ============================================================
' SYSTEM STATUS FUNCTIONS
' ============================================================

Sub ViewSystemErrors()
    ' Display open system errors
    Dim errorSheet As Worksheet
    Set errorSheet = Sheets("System Errors")
    
    Dim lastRow As Long
    lastRow = errorSheet.Cells(errorSheet.Rows.Count, 1).End(xlUp).Row
    
    If lastRow < 2 Then
        MsgBox "No system errors recorded." & vbCrLf & "System is running smoothly!", _
               vbInformation, "System Status"
        Exit Sub
    End If
    
    Dim openErrors As Long, resolvedErrors As Long
    openErrors = 0
    resolvedErrors = 0
    
    Dim i As Long
    For i = 2 To lastRow
        If UCase(errorSheet.Cells(i, 6).Value) = "RESOLVED" Then
            resolvedErrors = resolvedErrors + 1
        Else
            openErrors = openErrors + 1
        End If
    Next i
    
    Dim msg As String
    msg = "SYSTEM ERROR STATUS:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Errors: " & (openErrors + resolvedErrors) & vbCrLf & _
          "Open: " & openErrors & vbCrLf & _
          "Resolved: " & resolvedErrors & vbCrLf & vbCrLf
    
    If openErrors = 0 Then
        msg = msg & "✓ No open system errors!"
    Else
        msg = msg & "⚠ " & openErrors & " error(s) need attention!"
    End If
    
    MsgBox msg, vbInformation, "System Errors"
End Sub

Sub CheckInventoryMismatches()
    ' Check inventory mismatch status
    Dim invSheet As Worksheet
    Set invSheet = Sheets("Inventory Mismatch")
    
    Dim lastRow As Long
    lastRow = invSheet.Cells(invSheet.Rows.Count, 1).End(xlUp).Row
    
    If lastRow < 2 Then
        MsgBox "No inventory mismatches recorded." & vbCrLf & "Inventory is accurate!", _
               vbInformation, "Inventory Status"
        Exit Sub
    End If
    
    Dim openMismatches As Long, resolvedMismatches As Long
    openMismatches = 0
    resolvedMismatches = 0
    
    Dim i As Long
    For i = 2 To lastRow
        If UCase(invSheet.Cells(i, 7).Value) = "RESOLVED" Then
            resolvedMismatches = resolvedMismatches + 1
        Else
            openMismatches = openMismatches + 1
        End If
    Next i
    
    Dim msg As String
    msg = "INVENTORY MISMATCH STATUS:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Mismatches: " & (openMismatches + resolvedMismatches) & vbCrLf & _
          "Open: " & openMismatches & vbCrLf & _
          "Resolved: " & resolvedMismatches & vbCrLf & vbCrLf
    
    If openMismatches = 0 Then
        msg = msg & "✓ No open inventory mismatches!"
    Else
        msg = msg & "⚠ " & openMismatches & " mismatch(es) need attention!"
    End If
    
    MsgBox msg, vbInformation, "Inventory Status"
End Sub

' ============================================================
' PERFORMANCE & SLA FUNCTIONS
' ============================================================

Sub ViewPerformanceMetrics()
    ' Show overall performance summary
    Call CheckWaveStatus
    Application.Wait (Now + TimeValue("0:00:01"))
    Call VerifyTraining
    Application.Wait (Now + TimeValue("0:00:01"))
    Call AnalyzeStockIssues
    Application.Wait (Now + TimeValue("0:00:01"))
    Call CheckQualityRate
End Sub

Sub CheckSLACompliance()
    ' Calculate and display SLA compliance
    Dim querySheet As Worksheet
    Set querySheet = Sheets("Bash Queries Response")
    
    Dim lastRow As Long
    lastRow = querySheet.Cells(querySheet.Rows.Count, 1).End(xlUp).Row
    
    If lastRow < 2 Then
        MsgBox "No query data available for SLA calculation.", vbExclamation, "SLA Compliance"
        Exit Sub
    End If
    
    Dim totalQueries As Long, withinSLA As Long
    totalQueries = 0
    withinSLA = 0
    
    Dim i As Long
    For i = 2 To lastRow
        If querySheet.Cells(i, 7).Value = "RESPONDED" Then
            totalQueries = totalQueries + 1
            If IsNumeric(querySheet.Cells(i, 10).Value) Then
                If querySheet.Cells(i, 10).Value <= 5 Then
                    withinSLA = withinSLA + 1
                End If
            End If
        End If
    Next i
    
    Dim slaRate As Double
    If totalQueries > 0 Then
        slaRate = (withinSLA / totalQueries) * 100
    Else
        slaRate = 0
    End If
    
    Dim msg As String
    msg = "SLA COMPLIANCE REPORT:" & vbCrLf & String(50, "-") & vbCrLf & _
          "Total Responded Queries: " & totalQueries & vbCrLf & _
          "Within SLA (≤5 mins): " & withinSLA & vbCrLf & _
          "Compliance Rate: " & Format(slaRate, "0.0") & "%" & vbCrLf & vbCrLf & _
          "Target: >98%" & vbCrLf & vbCrLf
    
    If slaRate >= 98 Then
        msg = msg & "✓ Excellent SLA compliance!"
    ElseIf slaRate >= 90 Then
        msg = msg & "⚠ Good, aim to reach 98%+"
    Else
        msg = msg & "✗ SLA compliance needs improvement!"
    End If
    
    MsgBox msg, vbInformation, "SLA Compliance"
End Sub

' ============================================================
' UTILITY FUNCTIONS
' ============================================================

Sub ShowQuickHelp()
    ' Display quick help and shortcuts
    Dim msg As String
    msg = "E-COMMERCE OPERATIONS TRACKING SYSTEM" & vbCrLf & _
          String(50, "=") & vbCrLf & vbCrLf & _
          "AVAILABLE COMMANDS:" & vbCrLf & _
          "• ShowDashboard - View main dashboard" & vbCrLf & _
          "• AddBashQuery - Add customer query" & vbCrLf & _
          "• CheckWaveStatus - Check wave completion" & vbCrLf & _
          "• VerifyTraining - Check training status" & vbCrLf & _
          "• AnalyzeStockIssues - Analyze stock delays" & vbCrLf & _
          "• CheckQualityRate - Check audit coverage" & vbCrLf & _
          "• ViewSystemErrors - View system errors" & vbCrLf & _
          "• CheckSLACompliance - Check SLA metrics" & vbCrLf & vbCrLf & _
          "Run these macros from Developer > Macros" & vbCrLf & _
          "or use the custom buttons in the Dashboard."
    
    MsgBox msg, vbInformation, "Quick Help"
End Sub

Sub CreateQuickAccessMenu()
    ' Create buttons on Dashboard for quick access
    On Error Resume Next
    
    Dim ws As Worksheet
    Set ws = Sheets("Dashboard")
    
    ' Remove existing buttons if any
    Dim shp As Shape
    For Each shp In ws.Shapes
        If Left(shp.Name, 4) = "btn_" Then
            shp.Delete
        End If
    Next shp
    
    ' Add buttons (simplified - manual button creation recommended)
    MsgBox "To add quick access buttons:" & vbCrLf & _
           "1. Go to Developer tab" & vbCrLf & _
           "2. Click Insert > Button (Form Control)" & vbCrLf & _
           "3. Draw button on sheet" & vbCrLf & _
           "4. Assign macro when prompted" & vbCrLf & vbCrLf & _
           "Recommended buttons:" & vbCrLf & _
           "• Add Query (AddBashQuery)" & vbCrLf & _
           "• Check Waves (CheckWaveStatus)" & vbCrLf & _
           "• Check Training (VerifyTraining)" & vbCrLf & _
           "• Refresh Dashboard (RefreshDashboardMetrics)", _
           vbInformation, "Button Setup"
    
    On Error GoTo 0
End Sub
