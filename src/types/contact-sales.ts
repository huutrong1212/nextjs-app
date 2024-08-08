export interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error: any;
  register: any;
}

export enum ETopicType {
  PARTNER_WITH_BAN_VIEN = 1,
  WORK_WITH_BAN_VIEN = 2,
  NEED_SUPPORT = 3,
  GIVE_FEEDBACKS = 4,
}

export const TopicOption = {
  [ETopicType.PARTNER_WITH_BAN_VIEN]: 'Partner with Ban Vien',
  [ETopicType.WORK_WITH_BAN_VIEN]: 'Work with Ban Vien',
  [ETopicType.NEED_SUPPORT]: 'Need support',
  [ETopicType.GIVE_FEEDBACKS]: 'Give feedbacks',
};
