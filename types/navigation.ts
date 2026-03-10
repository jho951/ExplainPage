import type { IconName } from '@jho951/ui-components';

/**
 * 브라우저에서 링크를 열 때 사용할 수 있는 target 속성 값입니다.
 */
type NavigationTarget = '_blank' | '_parent' | '_self' | '_top';

/**
 * 기본적인 내비게이션 링크 구조입니다.
 * header, footer, drawer 등에서 공통적으로 사용됩니다.
 */
/**
 * NavLink interface 설명을 여기에 작성하세요.
 */
interface NavigationLink {
  /** 고유 ID (DB 또는 Key 구분용) */
  id: string;
  /** 표시될 텍스트 */
  label: string;
  /** 이동할 URL 경로 */
  href: string;
  /** 표시할 아이콘 이름 (IconName enum/type 사용) */
  icon?: IconName;
  /** (선택) 링크를 여는 방법 */
  target?: NavigationTarget;
}

/**
 * 트리형 메뉴에서 하위 항목 구조
 */
/**
 * NavChild type 설명을 여기에 작성하세요.
 */
type NavigationChild = {
  id: string;
  label: string;
  href: string;
  target?: NavigationTarget;
};

/**
 * 상위 + 하위 링크를 포함하는 트리형 구조
 */
/**
 * NavTreeLink interface 설명을 여기에 작성하세요.
 */
interface NavigationTreeLink extends NavigationLink {
  children?: NavigationChild[];
}

/**
 * SNS 또는 외부 플랫폼용 링크 구조
 */
/**
 * NavSocialLink interface 설명을 여기에 작성하세요.
 */
interface NavigationSocialLink {
  id: string;
  href: string;
  icon: IconName;
  external: boolean;
}

export type { NavigationTarget, NavigationLink, NavigationTreeLink, NavigationSocialLink };
