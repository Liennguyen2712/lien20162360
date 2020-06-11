import { EventDiary, EmpModel, EventDiaryModel, ProcessStatus } from "src/app/models/data/data";

export interface GridFilterModel {
    start: number;
    length: number;
}

export interface EventDiarySyncFilterModel extends GridFilterModel {
    yearMonth?: number;
    orgId?: number;
}

export interface RespondData {
    isSuccess?: boolean;
    status?: string;
    data?: any;
    message?: string;
}

export interface SelectListItem {
    key: string;
    value: any;
}

export interface IAppConfig {
    empTransferUrls: {
        paging: string;
        addOrEdit: string;
        count: string;
        get: string;
    };
    employmentHistoryUrls: {
        paging: string;
        count: string;
    };
    apiServerUrl: string;
    authUrls: {
        token: string;
    };
    menuUrls: {
        getMenu: string;
    };

    userUrls: {
        changePassword: string;
        getUsers: string;
    }

    kpiUrls: {
        addOrEdit: string;
        paging: string;
        pagingMng: string;
        pagingMngLv2: string;
        count: string;
        get: string;
        orgs: string;
        updateKpiEmp: string;
        processKpiLevel2Mng: string;
        updateStatusUncompletedKpi: string;
        updateKpiHRSendManager: string;
        updateKpiSendCorLeader: string;
        updateKpiComplete: string;
        updateKpiCompleteRange: string;
        countMng: string;
        countMngLv2: string;
        updateHRUnlockKpiRange: string;
        updateVIP: string;
        getDivisionManagerKpiPaging: string;
        countDivisionManager: string;
        getIsKpiValidForDivManager: string;
        getOrgsByDivManager: string;
        processRangeKpiLevel2Mng: string;
        updateRangeKpiBusinessApplication: string;
        updateRangeKpiHRManagerPropose: string;
        countHrManagerKpi: string;
        getHrManagerKpiPaging: string;
    };

    viewUserEventDiary: {
        addOrEdit: string;
        paging: string;
        count: string;
        get: string;
    };

    diaryCriterionDetailUrls: {
        addOrEdit: string;
        removeByManagerLv2: string;
    };

    eventDiaryUrls: {
        getEvByManager: string;
        getEvByManagerLv2: string;
        getEventByKpiManager: string;
        getMonthlyEventDiaryByHRManager: string;
        getEvByEmp: string;
        getEvByKpiId: string;
        getLevel1UserByLevel2Manager: string;
        getPagingExistedEventDiaryByYearMonth: string;
        getPagingMissingEventDiaryByYearMonth: string;
        getUsers: string;
        getEventByDivManager: string;
        addRangeDiaryKpi: string;
        updateRangeDiaryKpiConfigChanged: string;
    };

    userOrgUrls: {
        getEDUsersByOrg: string;
        get: string;
        getbyname: string;
        paging: string;
        addOrEdit: string;
        count: string;
        orgs: string;
        users: string;
        jobTitles: string;
        getOrgByUser: string;
        getEDUsersByEvent: string;
        getOrgsByCurrentLevel2Manager: string;
        getOrgsByCurrentLevel1Manager: string;
        getLevel1ManagerUserOrg: string;
        getLevel2ManagerUserOrg: string;
        getAllOrg: string;
        getAllUser: string;
        getAllJobTitle: string;
        deleteUser: string;
        countDivisionManager: string;
        searchPagingDivisionManager: string;
        getDivisionManagerPermission: string;
        saveDivisionManagerPermission: string;
        isVip: string;
    };
    criterionCatalogUrls: {
        getCriterionCatalog: string;
        getAll: string;
        get: string;
        paging: string;
        addOrEdit: string;
        count: string;
    };
    eventDiaryConfigUrls: {
        getConfigOrgByLevel1Manager: string;
        getConfigOrgByLevel2Manager: string;
        getConfigOrgByKpiManager: string;
        getConfigOrgByDivManager: string;
        addOrEdit: string;
        paging: string;
        count: string;
        get: string;
        orgList: string;
        userList: string;
    };
    kpiPeriodConfigUrls: {
        getConfigOrgByLevel1Manager: string;
        updateKPIByYearMonthEvent: string;
        addOrEdit: string;
        paging: string;
        count: string;
        get: string;
    };
    View_KpiEvaluation_OrganizationUrls: {
        search: string;
        getOrgs: string;
    };


    UnlockdiarycriterionUrls: {
        search: string;
        getOrgs: string;
    };


    ViewStatisticsReports: {
        search: string;
        getOrgs: string;
    };
    orgUrls: {
        get: string;
        getAll: string;
        paging: string;
        addOrEdit: string;
        count: string;
    };
    kpiCriterionTypeUrls: {
        getAll: string;
        get: string;
        paging: string;
        addOrEdit: string;
        count: string;
        getKpiCatalogs: string;
    };

    KpiStatus: ProcessStatus[];
    workStatus: ProcessStatus[];
}

export interface EventDiarySyncConfigModel extends GridFilterModel {

}

export interface KpiFilterModel extends GridFilterModel {
    employeeName?: string;
    orgName?: string;
    kpiMonth?: Date;
    level1ManagerName?: string;
    statusName?: string;
    yearMonth?: number;
    orgId?: number;

    statusIds?: number[];
    empName?: string;
    orgIds?: number[];
    level1ManagerUserName?: string;
    level2ManagerUserName?: string;
    empUserName?: string;
    userName?: string;
    isVip?: boolean;
}

export interface UserOrgFilterModel extends GridFilterModel {
    userName?: string;
    name?: string;
    orgId?: number;
}

export interface KpiMngFilterModel extends GridFilterModel {
    orgId?: number;
    yearMonth?: number;
    fullName?: string;
    empName?: string;
}

export interface UsersFilterModel extends GridFilterModel {
    employeeName?: string;
    orgName?: string;
    kpiMonth?: Date;
    level1ManagerName?: string;
    statusName?: string;
}
export interface ViewEventDiaryConfigFilterModel extends GridFilterModel {
    Name?: string;
    orgName?: string;
    FromDate?: Date;
    level1ManagerName?: string;
    orgId?: number;
    level1ManagerId?: number;
    level2ManagerId?: number;
}

export interface KpiPeriodConfigFilterModel extends GridFilterModel {
    FromDate?: Date;
    ToDate?: Date;
    PeriodConfig?: string;
    YearMonth?: number;
    Status?: string;
}

export interface ViewUserEventDiaryFilterModel extends GridFilterModel {
    employeeName?: string;
    orgName?: string;
    kpiMonth?: Date;
    level1ManagerName?: string;
    statusName?: string;
}

export interface View_User_EventDiaryFilterModel extends GridFilterModel {
    employeeName?: string;
    orgName?: string;
    kpiMonth?: Date;
    level1ManagerName?: string;
    statusName?: string;
}

export interface EventDiaryFilterModel {
    yearMonth?: number;
    orgId?: number;
}

export interface DailyEventModel {
    dayOfMonth?: number;
}

export enum DiaryCellTypeEnum {
    String = 1,
    Btn = 2,
    Arr = 3,
}

export interface DiaryDetailInputModel {
    emp: EmpModel;
    date: Date;
    eventDiary: EventDiaryModel;
}

export interface UpdateKpiDialogModel {
    eventDiaryConfigId?: number;
    yearMonth?: number;
}

export interface View_KpiEvaluation_Organization_Filter {
    orgId?: number;
    yearMonth?: number;
    directoryPath?: string;
}

export interface UnlockdiarycriterionFilter {
    orgId?: number;
    yearMonth?: number;
    directoryPath?: string;
}

export interface View_Statistics_Report_Filter {
    orgId?: number;
    yearMonth?: number;
    directoryPath?: string;
}

export interface KpiReadOnlyFilter {
    className?: string;
    kpiStatus?: number;
}

export interface ResetPasswordModel {
    // username?: string;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
}

export interface EmpTransferFilterModel extends GridFilterModel {
    empName?: string;
    fromDate?: Date;
    toDate?: Date;
}

export interface UserEmploymentFilterModel extends GridFilterModel {
    userId?: number;
}

export interface OrgFilterModel extends GridFilterModel {
    name?: string;
    code?: string;
}

export interface Kpi_CriterionTypeFilterModel extends GridFilterModel {
    name?: string;
    code?: string;
}

export interface CriterionCatalogFilterModel extends GridFilterModel {
    criterionTitle?: string;
    code?: string;
}
