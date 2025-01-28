-- Fix security warnings for user_emails_view while maintaining permission system
-- This script:
-- 1. Recreates the view with proper security
-- 2. Sets appropriate grants

-- Drop existing view
DROP VIEW IF EXISTS public.user_emails_view;

-- Recreate view with security checks built into the query
CREATE VIEW public.user_emails_view AS
SELECT 
    u.id,
    COALESCE(um.email, u.email) AS email,
    COALESCE(um.role, u.role) AS role
FROM auth.users u
LEFT JOIN user_management um ON um.user_id = u.id
WHERE 
    -- Only return rows where the current user:
    -- 1. Is an admin
    EXISTS (
        SELECT 1 
        FROM user_management admin_check 
        WHERE admin_check.user_id = auth.uid() 
        AND admin_check.role = 'admin'
    )
    OR
    -- 2. Is an editor with can_view_users permission
    EXISTS (
        SELECT 1 
        FROM user_management editor_check 
        WHERE editor_check.user_id = auth.uid() 
        AND editor_check.role = 'editor'
        AND editor_check.can_view_users = true
    )
    OR
    -- 3. Is viewing their own data or related comparison report data
    (
        EXISTS (
            SELECT 1 
            FROM user_management user_check 
            WHERE user_check.user_id = auth.uid() 
            AND user_check.role = 'user'
        )
        AND 
        (
            u.id = auth.uid() 
            OR 
            u.id IN (
                SELECT user_id 
                FROM user_comparison_report 
                WHERE user_id = auth.uid()
            )
        )
    );

-- Revoke all existing permissions
REVOKE ALL ON public.user_emails_view FROM PUBLIC;
REVOKE ALL ON public.user_emails_view FROM anon;
REVOKE ALL ON public.user_emails_view FROM authenticated;

-- Grant select only to authenticated users
GRANT SELECT ON public.user_emails_view TO authenticated;
